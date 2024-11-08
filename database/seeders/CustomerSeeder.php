<?php

namespace Database\Seeders;

use App\Models\User as Customer;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = [
            [
                'name' => 'customer1',
                'phone' => '01810000001',
                'email' => 'customer1@inventory.com',
            ],
            [
                'name' => 'customer2',
                'phone' => '01810000002',
                'email' => 'customer2@inventory.com',
            ],
            [
                'name' => 'customer3',
                'phone' => '01810000003',
                'email' => 'customer3@inventory.com',
            ],
            [
                'name' => 'customer4',
                'phone' => '01810000004',
                'email' => 'customer4@inventory.com',
            ],
            [
                'name' => 'customer5',
                'phone' => '01810000005',
                'email' => 'customer5@inventory.com',
            ],
            [
                'name' => 'customer6',
                'phone' => '01810000006',
                'email' => 'customer6@inventory.com',
            ],
            [
                'name' => 'customer7',
                'phone' => '01810000007',
                'email' => 'customer7@inventory.com',
            ],
            [
                'name' => 'customer8',
                'phone' => '01810000008',
                'email' => 'customer8@inventory.com',
            ],
            [
                'name' => 'customer9',
                'phone' => '01810000009',
                'email' => 'customer9@inventory.com',
            ],
            [
                'name' => 'customer10',
                'phone' => '01810000010',
                'email' => 'customer10@inventory.com',
            ],
        ];

        foreach ($customers as $customer) {
            Customer::create([
                'role_id' => Customer::CUSTOMER,
                'name' => $customer['name'],
                'phone' =>  $customer['phone'],
                'email' =>  $customer['email'],
                'password' => Hash::make(123456),
            ]);
        }
    }
}
