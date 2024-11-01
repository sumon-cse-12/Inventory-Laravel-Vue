<?php

namespace App\Repositories\Brand;

use App\Models\Brand;
use Illuminate\Support\Str;
use App\Service\FileUploadService;

class BrandRepository implements BrandInterface
{
    private $file_path = 'public/brands';
    public function store($request)
    {
        $data = Brand::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
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
        $data = Brand::latest('id')
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

        $data = Brand::latest('id')
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
        return Brand::findOrFail($id);
    }

    public function update($request, $id)
    {
        $data = $this->show($id);
            $data->update([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'code' => $request->code
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
