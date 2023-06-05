<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can upload files.
     *
     * @param User $user
     * @return bool
     */
    public function uploadFiles(User $user): bool
    {
        return true;
    }
}
