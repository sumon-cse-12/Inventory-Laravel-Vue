<?php

namespace Database\Seeders;

use App\Models\User as Supplier;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suppliers = [
            [
                'name' => 'Company1',
                'phone' => '01710000000',
                'email' => 'company1@inventory.com',
                'nid' => '0171-000-000-1',
                'address' => 'Company Address 1',
                'company_name' => 'Company1'
            ],
            [
                'name' => 'Company2',
                'phone' => '01720000000',
                'email' => 'company2@inventory.com',
                'nid' => '0172-000-000-2',
                'address' => 'Company Address 2',
                'company_name' => 'Company2'
            ],
            [
                'name' => 'Company3',
                'phone' => '01730000000',
                'email' => 'company3@inventory.com',
                'nid' => '0173-000-000-3',
                'address' => 'Company Address 3',
                'company_name' => 'Company3'
            ],
            [
                'name' => 'Company4',
                'phone' => '01740000000',
                'email' => 'company4@inventory.com',
                'nid' => '0174-000-000-4',
                'address' => 'Company Address 4',
                'company_name' => 'Company4'
            ],
            [
                'name' => 'Company5',
                'phone' => '01750000000',
                'email' => 'company5@inventory.com',
                'nid' => '0175-000-000-5',
                'address' => 'Company Address 5',
                'company_name' => 'Company5'
            ],
            [
                'name' => 'Company6',
                'phone' => '01760000000',
                'email' => 'company6@inventory.com',
                'nid' => '0176-000-000-6',
                'address' => 'Company Address 6',
                'company_name' => 'Company6'
            ],
            [
                'name' => 'Company7',
                'phone' => '01770000000',
                'email' => 'company7@inventory.com',
                'nid' => '0177-000-000-7',
                'address' => 'Company Address 7',
                'company_name' => 'Company7'
            ],
            [
                'name' => 'Company8',
                'phone' => '01780000000',
                'email' => 'company8@inventory.com',
                'nid' => '0178-000-000-8',
                'address' => 'Company Address 8',
                'company_name' => 'Company8'
            ],
            [
                'name' => 'Company9',
                'phone' => '01790000000',
                'email' => 'company9@inventory.com',
                'nid' => '0179-000-000-9',
                'address' => 'Company Address 9',
                'company_name' => 'Company9'
            ],
            [
                'name' => 'Company10',
                'phone' => '01800000000',
                'email' => 'company10@inventory.com',
                'nid' => '0180-000-000-0',
                'address' => 'Company Address 10',
                'company_name' => 'Company10'
            ],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::create([
                'role_id' => Supplier::SUPPLIER,
                'name' => $supplier['name'],
                'phone' =>  $supplier['phone'],
                'email' =>  $supplier['email'],
                'nid' =>  $supplier['nid'],
                'address' =>  $supplier['address'],
                'company_name' =>  $supplier['company_name'],
                'password' => Hash::make(1234),
            ]);
        }
    }
}
