<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Storage;

class StorageFileSize implements ValidationRule
{
    /**
     * @param int $maxSize
     */
    public function __construct(protected int $maxSize)
    {}

    /**
     * @param string $attribute
     * @param mixed $value
     * @param Closure $fail
     * @return void
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (Storage::size($value) > $this->maxSize) {
            $fail('Sorry, the file size is too large.');
        }
    }
}
