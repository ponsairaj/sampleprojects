<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::create([
            'title' => 'Food',
            'Author' => 'Chef',
            'content' => "Food is one of life's greatest pleasures, offering not only sustenance but also a way to connect with cultures, traditions, and people. From the rich, savory flavors of a perfectly grilled steak to the delicate sweetness of a freshly baked pastry, food has the power to evoke memories, spark joy, and bring people together. Whether it's a home-cooked meal shared with family or an exotic dish discovered while traveling, food transcends boundaries and tells stories. It nourishes both the body and the soul, making it an essential and celebrated part of our daily lives.",
        ]);

        Post::create([
            'title' => 'Nature',
            'Author' => 'Green activist',
            'content' => "Nature is a boundless source of beauty and inspiration, offering a sense of peace and wonder. From towering mountains and lush forests to serene lakes and vibrant sunsets, it reminds us of the Earth's incredible diversity and resilience. Nature provides not only physical resources like clean air and water but also a sanctuary for reflection and rejuvenation. It connects us to the cycles of life, encouraging mindfulness and a deeper appreciation for the world around us.",
        ]);

        Post::create([
            'title' => 'Travel',
            'Author' => 'Wanderer',
            'content' => "Travel opens doors to new experiences, cultures, and perspectives. It allows us to step out of our comfort zones, explore unfamiliar landscapes, and create lasting memories. Whether it's wandering through ancient cities, hiking remote trails, or tasting local cuisines, travel enriches our lives by broadening our horizons and fostering a deeper understanding of the world and its people.",
        ]);

        Post::create([
            'title' => 'Music',
            'Author' => 'Musician',
            'content' => "Music is a universal language that transcends barriers and touches the soul. It has the power to evoke emotions, tell stories, and bring people together. From the soothing melodies of classical compositions to the energetic beats of modern pop, music shapes our moods, memories, and experiences. It is both a personal escape and a shared celebration of creativity and expression.",
        ]);

        Post::create([
            'title' => 'Books',
            'Author' => 'Librarian',
            'content' => "Books are gateways to endless worlds, offering knowledge, imagination, and inspiration. They allow us to explore different perspectives, dive into fictional realms, or learn about real-life events and ideas. Whether it's a gripping novel, an insightful biography, or a practical guide, books enrich our minds and provide a quiet refuge from the hustle and bustle of daily life.",
        ]);

        Post::create([
            'title' => 'Art',
            'Author' => 'Artist',
            'content' => "Art is a powerful form of expression that captures the essence of human creativity. From paintings and sculptures to digital designs and street murals, it reflects emotions, cultures, and ideas. Art challenges us to see the world differently, sparking conversations and inspiring change. It is a timeless medium that connects people across generations and geographies.",
        ]);

        Post::create([
            'title' => 'Technology',
            'Author' => 'Engineer',
            'content' => "Technology shapes the way we live, work, and communicate, driving innovation and progress. From smartphones and artificial intelligence to renewable energy solutions, it transforms industries and improves lives. While it brings convenience and efficiency, it also challenges us to balance its benefits with ethical considerations and the need for human connection.",
        ]);

        Post::create([
            'title' => 'Fitness',
            'Author' => 'Trainer',
            'content' => "Fitness is a journey of self-care and empowerment, promoting physical and mental well-being. Whether through yoga, running, weightlifting, or dancing, staying active boosts energy, reduces stress, and builds confidence. It’s not just about achieving goals but also about cultivating a lifestyle that prioritizes health and happiness.",
        ]);

        Post::create([
            'title' => 'Photography',
            'Author' => 'Photographer',
            'content' => "Photography captures moments in time, preserving memories and telling stories through images. It allows us to see the world from unique perspectives, highlighting beauty in the ordinary and extraordinary alike. Whether as a hobby or a profession, photography is a creative outlet that combines technical skill with artistic vision.",
        ]);

        Post::create([
            'title' => 'Gardening',
            'Author' => 'Garderner',
            'content' => "Gardening is a rewarding and therapeutic activity that connects us with the natural world. It allows us to cultivate life, whether through growing vibrant flowers, fresh vegetables, or lush greenery. Gardening teaches patience, care, and the joy of nurturing something from seed to bloom. It also provides a sense of accomplishment and a peaceful escape from the stresses of modern life, making it a fulfilling hobby for people of all ages.",
        ]);
    }
}
