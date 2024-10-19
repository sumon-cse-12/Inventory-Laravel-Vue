<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
    public function run()
    {
        $brands = [
            ['name' => 'Brand One', 'slug' => Str::slug('Brand One'), 'code' => 'BR001'],
            ['name' => 'Brand Two', 'slug' => Str::slug('Brand Two'), 'code' => 'BR002'],
            ['name' => 'Brand Three', 'slug' => Str::slug('Brand Three'), 'code' => 'BR003'],
            ['name' => 'Brand Four', 'slug' => Str::slug('Brand Four'), 'code' => 'BR004'],
            ['name' => 'Brand Five', 'slug' => Str::slug('Brand Five'), 'code' => 'BR005'],
            ['name' => 'Brand Six', 'slug' => Str::slug('Brand Six'), 'code' => 'BR006'],
            ['name' => 'Brand Seven', 'slug' => Str::slug('Brand Seven'), 'code' => 'BR007'],
            ['name' => 'Brand Eight', 'slug' => Str::slug('Brand Eight'), 'code' => 'BR008'],
            ['name' => 'Brand Nine', 'slug' => Str::slug('Brand Nine'), 'code' => 'BR009'],
            ['name' => 'Brand Ten', 'slug' => Str::slug('Brand Ten'), 'code' => 'BR010'],
        ];

        DB::table('brands')->insert($brands);
    }
}
