<?php

namespace Database\Seeders;

use App\Models\User as Staff;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $staffs = [
            [
                'name' => 'staff1',
                'phone' => '01210000000',
                'email' => 'staff1@inventory.com',
                'nid' => '0171-334-000-1',
                'address' => 'staff Address 1'
            ],
            [
                'name' => 'staff2',
                'phone' => '01920000000',
                'email' => 'staff2@inventory.com',
                'nid' => '0172-121-000-2',
                'address' => 'staff Address 2'
            ],
            [
                'name' => 'staff3',
                'phone' => '01930000000',
                'email' => 'staff3@inventory.com',
                'nid' => '0173-343-000-3',
                'address' => 'staff Address 3'
            ],
            [
                'name' => 'staff4',
                'phone' => '01940000000',
                'email' => 'staff4@inventory.com',
                'nid' => '0174-456-000-4',
                'address' => 'staff Address 4'
            ],
            [
                'name' => 'staff5',
                'phone' => '01950000000',
                'email' => 'staff5@inventory.com',
                'nid' => '0175-865-000-5',
                'address' => 'staff Address 5'
            ],
            [
                'name' => 'staff6',
                'phone' => '01960000000',
                'email' => 'staff6@inventory.com',
                'nid' => '0176-456-000-6',
                'address' => 'staff Address 6'
            ],
            [
                'name' => 'staff7',
                'phone' => '01990000000',
                'email' => 'staff7@inventory.com',
                'nid' => '0177-000-555-7',
                'address' => 'staff Address 7'
            ],
            [
                'name' => 'staff8',
                'phone' => '01900070090',
                'email' => 'staff8@inventory.com',
                'nid' => '0178-000-777-8',
                'address' => 'staff Address 8'
            ],
            [
                'name' => 'staff9',
                'phone' => '01660000000',
                'email' => 'staff9@inventory.com',
                'nid' => '0166-666-000-9',
                'address' => 'staff Address 9'
            ],
            [
                'name' => 'staff10',
                'phone' => '01805340000',
                'email' => 'staff10@inventory.com',
                'nid' => '0180-222-000-0',
                'address' => 'staff Address 10',
            ],
        ];

        foreach ($staffs as $staff) {
            Staff::create([
                'role_id' => Staff::STAFF,
                'name' => $staff['name'],
                'phone' =>  $staff['phone'],
                'email' =>  $staff['email'],
                'nid' =>  $staff['nid'],
                'address' =>  $staff['address'],
                'password' => Hash::make(1234),
            ]);
        }
    }
}
