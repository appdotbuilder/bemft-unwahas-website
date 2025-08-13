<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\EventRegistration;
use App\Models\ManagementMember;
use Illuminate\Database\Seeder;

class BemDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample management members
        ManagementMember::factory()->create([
            'name' => 'Ahmad Rizki Pratama',
            'position' => 'President',
            'study_program' => 'Teknik Informatika',
            'sort_order' => 1,
            'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            'instagram' => 'rizki.pratama',
            'linkedin' => 'rizki-pratama',
            'email' => 'president@bem.unwahas.ac.id',
        ]);

        ManagementMember::factory()->create([
            'name' => 'Sari Dewi Maharani',
            'position' => 'Vice President',
            'study_program' => 'Teknik Industri',
            'sort_order' => 2,
            'photo' => 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
            'instagram' => 'sari.dewi',
            'linkedin' => 'sari-maharani',
            'email' => 'vicepresident@bem.unwahas.ac.id',
        ]);

        ManagementMember::factory()->create([
            'name' => 'Budi Santoso',
            'position' => 'Secretary',
            'study_program' => 'Teknik Sipil',
            'sort_order' => 3,
        ]);

        ManagementMember::factory()->create([
            'name' => 'Nia Putri Lestari',
            'position' => 'Treasurer',
            'study_program' => 'Teknik Elektro',
            'sort_order' => 4,
        ]);

        // Create additional members
        ManagementMember::factory(8)->create();

        // Create sample blog posts
        BlogPost::factory()->create([
            'title' => 'Welcome to BEM FT UNWAHAS Official Website',
            'excerpt' => 'We are excited to launch our new official website, your gateway to all student activities and information.',
            'content' => '<p>We are thrilled to announce the launch of our brand new official website for BEM FT UNWAHAS! This platform represents our commitment to better serve our student community and provide easy access to important information, events, and opportunities.</p>

<h3>What You Can Find Here</h3>
<ul>
<li><strong>Latest News & Updates:</strong> Stay informed about campus events, achievements, and announcements</li>
<li><strong>Event Registration:</strong> Easily register for workshops, seminars, and campus activities</li>
<li><strong>Team Information:</strong> Get to know your student representatives and their roles</li>
<li><strong>Resources:</strong> Access important documents, forms, and academic resources</li>
</ul>

<h3>Our Commitment</h3>
<p>As your student executive board, we are dedicated to creating a vibrant campus life, fostering academic excellence, and building strong connections within our engineering community. This website is just one of the many ways we are working to improve communication and engagement with our fellow students.</p>

<p>We encourage you to explore the website, register for upcoming events, and reach out to us with any questions or suggestions. Together, we can make our time at Faculty of Engineering truly memorable and impactful.</p>

<p>Welcome to the new digital home of BEM FT UNWAHAS!</p>',
            'status' => 'published',
            'published_at' => now()->subDays(1),
        ]);

        BlogPost::factory()->create([
            'title' => 'Engineering Excellence Workshop Series 2024',
            'excerpt' => 'Join us for a comprehensive workshop series designed to enhance your engineering skills and career prospects.',
            'content' => '<p>We are excited to announce the launch of our Engineering Excellence Workshop Series 2024! This comprehensive program is designed to equip students with practical skills and knowledge that will enhance their academic journey and future career prospects.</p>

<h3>Workshop Schedule</h3>
<ul>
<li><strong>March 20, 2024:</strong> Introduction to Project Management</li>
<li><strong>March 27, 2024:</strong> Advanced Programming Techniques</li>
<li><strong>April 3, 2024:</strong> Sustainable Engineering Practices</li>
<li><strong>April 10, 2024:</strong> Leadership in Engineering</li>
<li><strong>April 17, 2024:</strong> Innovation and Entrepreneurship</li>
</ul>

<h3>Why Attend?</h3>
<p>These workshops are led by industry professionals and experienced faculty members who will share real-world insights and practical knowledge. Participants will receive certificates of completion and have the opportunity to network with peers and professionals.</p>

<p>Registration is now open! Visit our events page to secure your spot. Limited seats available.</p>',
            'status' => 'published',
            'published_at' => now()->subHours(6),
        ]);

        // Create more sample blog posts
        BlogPost::factory(5)->published()->create();
        BlogPost::factory(2)->draft()->create();

        // Create sample event registrations
        EventRegistration::factory(25)->create();
    }
}