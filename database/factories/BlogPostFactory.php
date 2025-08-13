<?php

namespace Database\Factories;

use App\Models\BlogPost;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogPost>
 */
class BlogPostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\BlogPost>
     */
    protected $model = BlogPost::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(4, true);
        $slug = Str::slug($title);

        return [
            'title' => $title,
            'slug' => $slug,
            'excerpt' => fake()->paragraph(2),
            'content' => fake()->paragraphs(5, true),
            'featured_image' => fake()->randomElement([
                'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
                'https://images.unsplash.com/photo-1571260899304-425eee4c7efc',
                'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
                null
            ]),
            'status' => fake()->randomElement(['draft', 'published', 'published', 'published']),
            'published_at' => fake()->randomElement([
                fake()->dateTimeBetween('-30 days', 'now'),
                fake()->dateTimeBetween('-30 days', 'now'),
                null
            ]),
        ];
    }

    /**
     * Indicate that the blog post is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => fake()->dateTimeBetween('-30 days', 'now'),
        ]);
    }

    /**
     * Indicate that the blog post is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }
}