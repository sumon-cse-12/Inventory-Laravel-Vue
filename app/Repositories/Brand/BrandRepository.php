<?php

namespace App\Repositories\Brand;

use App\Models\Brand;
use Illuminate\Support\Str;

class BrandRepository implements BrandInterface
{
    public function store($request)
    {
        $data = Brand::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name), 
            'code' => $request->code
        ]);
        return $this->show($data->id);
    }

    public function all()
    {
        return Brand::latest('id')->get();
    }

    public function allPaginated($perPage)
    {
        return Brand::latest('id')->paginate($perPage);
    }

    public function show($id)
    {
        return Brand::findOrFail($id);
    }

    public function update($request, $id)
    {
        $brand = $this->show($id);
        if ($brand) {
            $brand->update([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'code' => $request->code
            ]);
            return $brand;
        }

        return null;
    }

    public function delete($id)
    {
        $brand = $this->show($id);
        if ($brand) {
            $brand->delete();
            return true;
        }
        return false;
    }

    public function status($id)
    {
        $data = $this->show($id);
        $data->is_active = !$data->is_active;
        $data->save();
        return $data;
    }
}
