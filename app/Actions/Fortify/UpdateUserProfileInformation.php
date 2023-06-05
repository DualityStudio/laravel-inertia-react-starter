<?php

namespace App\Actions\Fortify;

use App\Models\User;
use App\Rules\StorageFileExists;
use App\Rules\StorageFileSize;
use App\Rules\StorageFileValidateType;
use App\Traits\HandlesUpload;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;

class UpdateUserProfileInformation implements UpdatesUserProfileInformation
{
    use HandlesUpload;

    /**
     * Validate and update the given user's profile information.
     *
     * @param  array<string, string>  $input
     */
    public function update(User $user, array $input): void
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'photo' => [
                'nullable',
                'string',
                new StorageFileExists(),
                new StorageFileSize(1024 * 1024 * 2), // 2mb
                new StorageFileValidateType(['image/jpeg', 'image/png', 'image/gif']),
            ],
        ])->validateWithBag('updateProfileInformation');

        if (isset($input['photo'])) {
            $uploadedKey = $this->processUpload($input['photo'], 'public', 'avatars/');

            $user->forceFill([
                'profile_photo_path' => $uploadedKey,
            ])->save();
        }

        if ($input['email'] !== $user->email && $user instanceof MustVerifyEmail) {
            $this->updateVerifiedUser($user, $input);
        } else {
            $user->forceFill([
                'name' => $input['name'],
                'email' => $input['email'],
            ])->save();
        }
    }

    /**
     * Update the given verified user's profile information.
     *
     * @param  array<string, string>  $input
     */
    protected function updateVerifiedUser(User $user, array $input): void
    {
        $user->forceFill([
            'name' => $input['name'],
            'email' => $input['email'],
            'email_verified_at' => null,
        ])->save();

        $user->sendEmailVerificationNotification();
    }
}
