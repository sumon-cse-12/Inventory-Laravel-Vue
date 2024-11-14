<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use App\Models\ExpenseCategory;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ExpenseCategorySeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $expenseCategories = [
            'purchase',
            'snacks',
            'rent',
            'cleaning',
            'electricity bill',
            'water bill',
            'gas bill',
            'miscellaneous',
        ];

        foreach ($expenseCategories as $item) {
           ExpenseCategory::create([
            'name' => $item,
            'slug' => Str::slug($item),
           ]);
        }
    }
}
