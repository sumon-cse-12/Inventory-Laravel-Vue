<?php

namespace App\Repositories\Category;

use App\Models\Category;
use Illuminate\Support\Str;
use App\Service\FileUploadService;
use App\Repositories\Category\CategoryInterface;

class CategoryRepository implements CategoryInterface
{
    private $file_path = 'public/category';
    public function store($request)
    {
        $data = Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->slug),
            'code' => $request->code
        ]);

        $image_path = (new FileUploadService())->imageUpload($request, $data, $this->file_path);
        $data->update([
            'file' => $image_path
        ]);
        return $this->show($data->id);
    }


    public function all()
    {
        $data = Category::latest('id')
                ->when(request('name'), function($query){
                    $query->where(['name' => request('name')]);
                })
                ->when(request('code'), function($query){
                    $query->where(['code' => request('code')]);
                })
             ->get();
        return $data;
    }

    public function allPaginated($perPage)
    {
        $data = Category::latest('id')
        ->when(request('search'), function($query){
            $query->where('name', 'like', '%'.request('search').'%')
            ->orWhere('code','like','%'.request('search').'%');
        })
        ->when(request('name'), function($query){
            $query->where(['name' => request('name')]);
        })
        ->when(request('code'), function($query){
            $query->where(['code' => request('code')]);
        })
           ->paginate($perPage);
        return $data;
    }


    public function show($id)
    {
        return Category::findOrFail($id);
    }

    public function update($request, $id)
    {
        $data = $this->show($id);
        $data->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'code' => $request->code,
        ]);
        /* image upload */
        $image_path = (new FileUploadService())->imageUpload($request, $data, $this->file_path);

        /* Update file stage */
        $data->update([
            'file' => $image_path
        ]);
        return $data;
    }


    public function delete($id)
    {
        $category = $this->show($id);
        if ($category) {
            $category->delete();
            return true;
        }
        return false;
    }

    public function status($id)
    {
        $data = $this->show($id);
        if ($data->is_active == 1) {
            $data->is_active == 0;
        }elseif($data->is_active == 0){
            $data->is_active == 1;
        }
        $data->save();
        return $data;
    }
}
