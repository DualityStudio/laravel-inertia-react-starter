<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateAssessmentSectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @var array[] $rules
     */
    public $rules = [
        'yes-no' => [
            'nullable',
            'string',
            'in:Yes,No',
        ],
        'rating' => [
            'nullable',
            'integer',
            'min:1',
            'max:5',
        ],
        'select' => [
            'nullable',
            'string',
        ],
        'multiple-choice' => [
            'nullable',
            'array',
        ],
        'multiple-choice.*' => [
            'required',
            'string',
        ],
        'text' => [
            'nullable',
            'string',
            'max:2500',
        ],
    ];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return $this->route('section')
            ->questions
            ->filter(fn ($question) => $question->isVisible($this->toArray()))
            ->mapWithKeys(function ($question) {
                if (isset($this->rules[$question->type?->value])) {
                    $rules = [
                        $question->id => $this->rules[$question->type?->value],
                    ];

                    if ($question->type === 'select') {
                        $rules[$question->id][] = Rule::in($question->answers->pluck('value')->toArray());
                    } elseif ($question->type === 'multiple-choice') {
                        $rules[$question->id . '.*'] = [
                            ...$this->rules[$question->type . '.*'],
                            Rule::in($question->answers->pluck('value')->toArray()),
                        ];
                    }
                }

                return $rules ?? [];
            })
            ->toArray();
    }

    /**
     * @return string[]
     */
    public function messages(): array
    {
        return [
            'required' => 'The \':attribute\' question is required.',
            'string' => 'The \':attribute\' question must be a string.',
            'in' => 'The selected \':attribute\' answer is invalid.',
            'integer' => 'The \':attribute\' question must be an integer.',
            'min' => [
                'array' => 'The \':attribute\' question must have at least :min items.',
                'file' => 'The \':attribute\' question must be at least :min kilobytes.',
                'numeric' => 'The \':attribute\' question must be at least :min.',
                'string' => 'The \':attribute\' question must be at least :min characters.',
            ],
            'max' => [
                'array' => 'The \':attribute\' question must not have more than :max items.',
                'file' => 'The \':attribute\' question must not be greater than :max kilobytes.',
                'numeric' => 'The \':attribute\' question must not be greater than :max.',
                'string' => 'The \':attribute\' question must not be greater than :max characters.',
            ],
            'array' => 'The \':attribute\' question must be an array.',
        ];
    }

    /**
     * @return array
     */
    public function attributes(): array
    {
        return $this->route('section')
            ->questions
            ->mapWithKeys(fn ($question) => [$question->id => $question->text])
            ->toArray();
    }
}
