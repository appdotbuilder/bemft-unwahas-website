<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ManagementMember
 *
 * @property int $id
 * @property string $name
 * @property string $position
 * @property string $study_program
 * @property string|null $photo
 * @property string|null $instagram
 * @property string|null $linkedin
 * @property string|null $twitter
 * @property string|null $email
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember query()
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember whereInstagram($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember whereLinkedin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember wherePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember whereStudyProgram($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember whereTwitter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManagementMember whereUpdatedAt($value)
 * @method static \Database\Factories\ManagementMemberFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ManagementMember extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'position',
        'study_program',
        'photo',
        'instagram',
        'linkedin',
        'twitter',
        'email',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sort_order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The default ordering for the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('ordered', function ($query) {
            $query->orderBy('sort_order');
        });
    }
}