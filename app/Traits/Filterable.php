<?php

namespace App\Traits;

use App\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    /**
     * @param $query
     * @param QueryFilter $filters
     * @param $additionalData
     * @return Builder
     */
    public function scopeFilter($query, QueryFilter $filters, $additionalData = null)
    {
        return $filters->apply($query, $additionalData);
    }
}
