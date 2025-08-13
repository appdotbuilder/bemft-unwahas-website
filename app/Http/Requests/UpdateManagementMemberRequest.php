<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateManagementMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'study_program' => 'required|string|max:255',
            'photo' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'twitter' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'sort_order' => 'nullable|integer|min:0',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Member name is required.',
            'position.required' => 'Member position is required.',
            'study_program.required' => 'Study program is required.',
            'email.email' => 'Please provide a valid email address.',
        ];
    }
}