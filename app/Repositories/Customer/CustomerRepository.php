<?php

namespace App\Repositories\Customer;

use App\Models\User as Customer;
use App\Service\FileUploadService;
use Illuminate\Support\Facades\Hash;
use App\Repositories\Customer\CustomerInterface;

class CustomerRepository implements CustomerInterface
{
    private $file_path = "public/Customer";
    public function store($request_data)
    {
        $data = Customer::create([
            'role_id' => Customer::CUSTOMER,
            'name' => $request_data->name,
            'phone' =>  $request_data->phone,
            'email' =>  $request_data->email,
            'password' => Hash::make(1234),
        ]);

        /* image upload */
        $file_path = (new FileUploadService())->fileUpload($request_data, $data, $this->file_path);

        /* Update file stage */
        $data->update([
            'file' => $file_path
        ]);
        return $this->show($data->id);
    }

    /*
    * @retun mixed|void
    */

    public function all()
    {
        $data = Customer::Customer()
        ->latest('id')
        ->get();
        return $data;
    }

    /*
    * @retun mixed|void
    */

    public function allPaginate($perPage)
    {
        $data = Customer::Customer()
        ->latest('id')
        ->when(request('search'), function($query){
            $query->where('name', 'like', '%'.request('search').'%')
                ->orWhere('phone', 'like', '%'.request('search').'%')
                ->orWhere('email', 'like', '%'.request('search').'%');
        })
        ->paginate($perPage);

        return $data;
    }

    /*
    * @retun mixed|void
    */

    public function show($id)
    {
        return Customer::findOrFail($id);
    }

    /*
    * @param $data
    * @return mixed|void
    */

    public function update($request_data, $id)
    {
        $data = $this->show($id);
        $data->update([
            'role_id' => Customer::CUSTOMER,
            'name' => $request_data->name,
            'phone' =>  $request_data->phone,
            'email' =>  $request_data->email,
        ]);
        /* image upload */
        $image_path = (new FileUploadService())->imageUpload($request_data, $data, $this->file_path);

        /* Update file stage */
        $data->update([
            'file' => $image_path
        ]);
        return $data;
    }

    /*
    * @retun mixed|void
    */

    public function delete($id)
    {
        $data = $this->show($id);
        $data->delete();
        return true;
    }

    /*
    * @retun mixed|void
    */

    public function status($id)
    {
        $data = $this->show($id);
        if($data->is_active == 1){
            $data->is_active = 0;
        }elseif($data->is_active == 0){
            $data->is_active = 1;
        }
        $data->save();
        return $data;
    }
}
