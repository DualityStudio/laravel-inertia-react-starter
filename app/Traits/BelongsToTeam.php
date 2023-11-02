<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Team;

/**
 * Trait BelongsToTeam
 */
trait BelongsToTeam
{
    /**
     * @return void
     */
    public function initializeBelongsToTeam(): void
    {
        $this->fillable = array_merge($this->fillable, [
            'team_id',
        ]);

        static::creating(static function (Model $model) {
            $team = request()->user()?->currentTeam;

            if ($team && !$model->team_id) {
                $model->team_id = $team->id;
            }
        });
    }

    /**
     * @return BelongsTo
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * @param $query
     * @param $teamId
     * @return mixed
     */
    public function scopeBelongsToTeam($query, $teamId)
    {
        return $query->where('team_id', $teamId);
    }
}
