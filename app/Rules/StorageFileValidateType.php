<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Storage;

class StorageFileValidateType implements ValidationRule
{
    /**
     * @param array $mimes
     */
    public function __construct(protected array $mimes)
    {}

    /**
     * @param string $attribute
     * @param mixed $value
     * @param Closure $fail
     * @return void
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!in_array(Storage::mimeType($value), $this->mimes)) {
            $fail('Sorry, the file type is not allowed.');
        }
    }
}
