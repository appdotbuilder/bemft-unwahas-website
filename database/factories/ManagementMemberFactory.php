<?php

namespace Database\Factories;

use App\Models\ManagementMember;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ManagementMember>
 */
class ManagementMemberFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\ManagementMember>
     */
    protected $model = ManagementMember::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $positions = [
            'President',
            'Vice President',
            'Secretary',
            'Treasurer',
            'Head of Academic Affairs',
            'Head of Student Welfare',
            'Head of External Relations',
            'Head of Internal Relations',
            'Head of Media & Information',
            'Head of Events',
        ];

        $studyPrograms = [
            'Teknik Informatika',
            'Teknik Sipil',
            'Teknik Mesin',
            'Teknik Elektro',
            'Teknik Industri',
        ];

        $name = fake()->name();
        $username = Str::lower(str_replace(' ', '', $name));

        return [
            'name' => $name,
            'position' => fake()->randomElement($positions),
            'study_program' => fake()->randomElement($studyPrograms),
            'photo' => fake()->randomElement([
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
                'https://images.unsplash.com/photo-1494790108755-2616b612b786',
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
                null
            ]),
            'instagram' => fake()->randomElement([
                $username,
                '@' . $username,
                null
            ]),
            'linkedin' => fake()->randomElement([
                $username,
                'in/' . $username,
                null
            ]),
            'twitter' => fake()->randomElement([
                '@' . $username,
                $username,
                null
            ]),
            'email' => fake()->randomElement([
                fake()->safeEmail(),
                null
            ]),
            'sort_order' => fake()->numberBetween(1, 100),
        ];
    }
}