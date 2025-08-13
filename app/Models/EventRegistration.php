<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\EventRegistration
 *
 * @property int $id
 * @property string $full_name
 * @property string $email
 * @property string $phone
 * @property string $study_program
 * @property string $university
 * @property \Illuminate\Support\Carbon $registered_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|EventRegistration newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EventRegistration newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EventRegistration query()
 * @method static \Illuminate\Database\Eloquent\Builder|EventRegistration whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EventRegistration whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EventRegistration whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EventRegistration whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EventRegistration wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EventRegistration whereRegisteredAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EventRegistration whereStudyProgram($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EventRegistration whereUniversity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EventRegistration whereUpdatedAt($value)
 * @method static \Database\Factories\EventRegistrationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class EventRegistration extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'study_program',
        'university',
        'registered_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'registered_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Boot the model and set registered_at automatically.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($registration) {
            if (!$registration->registered_at) {
                $registration->registered_at = now();
            }
        });
    }
}