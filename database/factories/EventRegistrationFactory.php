<?php

namespace Database\Factories;

use App\Models\EventRegistration;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EventRegistration>
 */
class EventRegistrationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\EventRegistration>
     */
    protected $model = EventRegistration::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $studyPrograms = [
            'Teknik Informatika',
            'Teknik Sipil',
            'Teknik Mesin',
            'Teknik Elektro',
            'Teknik Industri',
            'Teknik Kimia',
            'Teknik Arsitektur',
            'Sistem Informasi',
        ];

        $universities = [
            'Universitas Wahid Hasyim',
            'Universitas Diponegoro',
            'Universitas Gadjah Mada',
            'Institut Teknologi Bandung',
            'Universitas Indonesia',
            'Universitas Airlangga',
            'Institut Teknologi Surabaya',
            'Universitas Brawijaya',
            'Universitas Sebelas Maret',
            'Universitas Negeri Semarang',
        ];

        return [
            'full_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'study_program' => fake()->randomElement($studyPrograms),
            'university' => fake()->randomElement($universities),
            'registered_at' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }
}