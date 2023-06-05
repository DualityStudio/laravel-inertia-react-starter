<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Carbon\Carbon;

class QueryFilter
{
    /**
     * @var Request
     */
    protected $request;

    /**
     * @var Builder
     */
    protected $builder;

    /**
     * @var null
     */
    protected $filters = null;

    /**
     * @var array
     */
    protected $defaultFilters = [
        'equals',
        'boolean',
        'isEmpty',
        'stringContains',
        'beforeDateTime',
        'afterDateTime',
        'in'
    ];

    /**
     * @var array
     */
    protected $allowedOperators = [
        'eq',
        'not_eq',
        'contains',
        'not_contain',
        'gt',
        'gt_eq',
        'lt',
        'lt_eq',
    ];

    /**
     * QueryFilter constructor.
     * @param Request $request
     */
    public function __construct(?Request $request = null)
    {
        $this->request = $request;
    }

    /**
     * @param $filters
     * @return self
     */
    public static function make($filters)
    {
        // static() returns the child class.
        // (https://stackoverflow.com/questions/10131786/how-does-self-exactly-work-in-inherited-classes)
        $filter = new static();

        $filter->setFilters($filters);

        return $filter;
    }

    /**
     * @param Builder $builder
     * @param $additionalData
     * @return Builder
     */
    public function apply(Builder $builder, $additionalData)
    {
        $this->builder = $builder;

        $filters = $this->filters();

        if ($filters) {
            foreach ($filters as $name => $value) {
                if ($value === null) {
                    continue;
                }

                // If the value is an array then split it out to get the operator
                // else default the operator to "=".
                if (is_array($value)) {
                    foreach ($value as $key => $value2) {
                        $this->applyFilter($key, $name, $value2);
                    }
                } else {
                    $this->applyFilter('=', $name, $value);
                }
            }
        }

        return $this->builder;
    }

    public function applyFilter($operator, $name, $value)
    {
        // If the operator is one of the defaultFilters methods then call that.
        // Else call the custom method.
        if (in_array($operator, $this->defaultFilters)) {
            $this->handleDefaultFilter($operator, $name, $value);
        } else {
            // Convert underscore to camelcase
            $name = Str::title(str_replace('_', ' ', $name));
            $name = str_replace(' ', '', strtolower($name[0]) . '' . substr($name, 1));

            if (method_exists($this, $name)) {
                $operator = $this->getOperator($operator);

                $this->$name($value, $operator);
            }
        }
    }

    /**
     * @return array
     */
    public function filters()
    {
        if ($this->filters !== null) {
            return $this->filters;
        }

        if ($this->request) {
            return $this->request->filled('filters') ? $this->request->get('filters') : $this->request->all();
        }
    }

    /**
     * @param $filters
     */
    public function setFilters($filters)
    {
        $this->filters = $filters;
    }

    /**
     * @param string $operator
     */
    public function getOperator($operator)
    {
        if (!in_array($operator, $this->allowedOperators)) {
            $operator = 'eq';
        }

        switch ($operator) {
            case 'eq':
                $operator = '=';
                break;
            case 'not_eq':
                $operator = '<>';
                break;
            case 'contains':
                $operator = 'like';
                break;
            case 'not_contain':
                $operator = 'not like';
                break;
            case 'gt':
                $operator = '>';
                break;
            case 'gt_eq':
                $operator = '>=';
                break;
            case 'lt':
                $operator = '<';
                break;
            case 'lt_eq':
                $operator = '<=';
                break;
        }

        return $operator;
    }

    /**
     * @param $ids
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function ids($ids)
    {
        return $this->builder->whereIn('id', explode(',', $ids));
    }

    /**
     * @param $ids
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function notIds($ids)
    {
        return $this->builder->whereNotIn('id', explode(',', $ids));
    }

    /**
     * @param $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function deleted($value)
    {
        if ($value === 'withTrashed') {
            return $this->builder->withTrashed();
        } else if ($value === 'onlyTrashed') {
            return $this->builder->onlyTrashed();
        }

        return $this->builder;
    }

    /**
     * @param string $filter
     * @param string $column
     * @param string $term
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function handleDefaultFilter($filter, $column, $term)
    {
        return $this->$filter($this->builder, $column, $term);
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $column
     * @param string $term
     */
    public function equals($query, $column, $term)
    {
        $query->where($column, $term);
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $column
     * @param string $term
     */
    public function boolean($query, $column, $term)
    {
        if ($term === 'Yes') {
            $query->where($column, true);
        } elseif ($term === 'No') {
            $query->where($column, false);
        }
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $column
     * @param string $term
     */
    public function isEmpty($query, $column, $term)
    {
        if ($term === 'is_empty') {
            $query->where(function ($subquery) use($column) {
                $subquery->whereNull($column)
                    ->orWhere($column, '=', '');
            });
        } elseif($term === 'is_not_empty') {
            $query->where(function ($subquery) use($column) {
                $subquery->whereNotNull($column)
                    ->where($column, '!=', '');
            });
        }
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $column
     * @param string $term
     */
    public function stringContains($query, $column, $term)
    {
        $query->where($column, 'LIKE', '%' . $term . '%');
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $column
     * @param string $term
     */
    public function beforeDateTime($query, $column, $term)
    {
        $carbon = Carbon::parse($term);

        $query->where($column, '<=', $carbon->toISOString());
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $column
     * @param string $term
     */
    public function afterDateTime($query, $column, $term)
    {
        $carbon = Carbon::parse($term);

        $query->where($column, '>=', $carbon->toISOString());
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $column
     * @param string $term
     */
    public function in($query, $column, $term)
    {
        $query->whereIn($column, explode(',', $term));
    }
}
