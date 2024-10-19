<?php

namespace App\Repositories\Category;

use App\Models\Category;
use Illuminate\Support\Str;
use App\Repositories\Category\CategoryInterface;

class CategoryRepository implements CategoryInterface
{
    public function store($request)
    {
        $data = Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->slug),
            'code' => $request->code
        ]);
        return $this->show($data->id);
    }


    public function all()
    {
        return Category::latest('id')->get();
    }

    public function allPaginated($perPage)
    {
        return Category::latest('id')->paginate($perPage);
    }


    public function show($id)
    {
        return Category::findOrFail($id);
    }

    public function update($request, $id)
    {
        $category = $this->show($id);
        if($category){
            $data =  $category->update([
                'name' => $request->name,
                'slug' => Str::slug($request->slug),
                'code' => $request->code
            ]);
            return $data;
        }else{

        return null;
        }
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
