<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Electronics',
                'slug' => Str::slug('Electronics'),
                'code' => 'CAT001',
                'file' => 'electronics.png',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mobile Phones',
                'slug' => Str::slug('Mobile Phones'),
                'code' => 'CAT002',
                'file' => 'mobile_phones.png',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Laptops',
                'slug' => Str::slug('Laptops'),
                'code' => 'CAT003',
                'file' => 'laptops.png',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Appliances',
                'slug' => Str::slug('Appliances'),
                'code' => 'CAT004',
                'file' => 'appliances.png',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fashion',
                'slug' => Str::slug('Fashion'),
                'code' => 'CAT005',
                'file' => 'fashion.png',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Toys',
                'slug' => Str::slug('Toys'),
                'code' => 'CAT006',
                'file' => 'toys.png',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Books',
                'slug' => Str::slug('Books'),
                'code' => 'CAT007',
                'file' => 'books.png',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Groceries',
                'slug' => Str::slug('Groceries'),
                'code' => 'CAT008',
                'file' => 'groceries.png',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Home Decor',
                'slug' => Str::slug('Home Decor'),
                'code' => 'CAT009',
                'file' => 'home_decor.png',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sports',
                'slug' => Str::slug('Sports'),
                'code' => 'CAT010',
                'file' => 'sports.png',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
