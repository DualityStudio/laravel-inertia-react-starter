<?php

namespace App\Traits;

use Exception;

/**
 * Trait HasUuid
 */
trait Orderable
{
    /**
     * Apply a key if one is not already present
     *
     * @throws Exception
     */
    protected static function bootOrderable(): void
    {
        static::creating(static function ($model) {
            $column = $model->getOrderColumn();

            if (!$model->{$column}) {
                $model->{$column} = self::max($column) + 1;
            }
        });
    }

    /**
     * @return string
     */
    public function getOrderColumn(): string
    {
        return 'order';
    }
}
