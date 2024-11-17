<?php

namespace App\Repositories\Expense;

use App\Models\Expense;
use Illuminate\Support\Str;
use App\Models\ExpenseCategory;
use App\Service\FileUploadService;
use Illuminate\Support\Facades\Hash;

class ExpenseRepository implements ExpenseInterface
{
    private $file_path = "public/expense";
    /*
    * @param $data
    * @return mixed|void
    */

    public function store($request_data)
    {
        $data = Expense::create([
            'expense_category_id' => $request_data->expense_category_id,
            'staff_id' =>  $request_data->staff_id,
            'amount' =>  $request_data->amount,
            'notes' =>  $request_data->notes,
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
        $data = Expense::latest('id')
        ->with(['staff','category'])
        ->get();
        return $data;
    }

    public function allExpenseCategory()
    {
        $data = ExpenseCategory::latest('id')
        ->get();
        return $data;
    }

    /*
    * @retun mixed|void
    */

    public function allPaginate($perPage)
    {
        $data = Expense::latest('id')
        ->when(request('search'), function($query){
            $query->where('amount', 'like', '%'.request('search').'%')
                ->orWhere('created_at', 'like', '%'.request('search').'%');
        })
        ->with(['staff','category'])
        ->paginate($perPage);

        return $data;
    }

    /*
    * @retun mixed|void
    */

    public function show($id)
    {
        return Expense::with(['staff','category'])->findOrFail($id);
    }

    /*
    * @param $data
    * @return mixed|void
    */

    public function update($request_data, $id)
    {
        $data = $this->show($id);
        $data->update([
            'expense_category_id' => $request_data->expense_category_id,
            'staff_id' =>  $request_data->staff_id,
            'amount' =>  $request_data->amount,
            'notes' =>  $request_data->notes,
        ]);
        /* image upload */
        $image_path = (new FileUploadService())->imageUpload($request_data, $data, $this->file_path);

        /* Update file stage */
        $data->update([
            'file' => $image_path
        ]);
        return $data;
    }
}
