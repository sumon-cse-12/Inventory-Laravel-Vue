<?php

namespace App\Http\Controllers;

use App\Trait\ApiResponse;
use Illuminate\Http\Request;
use App\Http\Requests\BrandRequest;
use App\Http\Resources\BrandResource;
use App\Repositories\Brand\BrandRepository;

class BrandController extends Controller
{
    use ApiResponse;
    protected $brandRepository;

    public function __construct(BrandRepository $brandRepository)
    {
        $this->brandRepository = $brandRepository;
    }

    public function store(BrandRequest $request)
    {
        dd('brands');

        try {
            $data = $this->brandRepository->store($request);
            return $this->ResponseSequence(new BrandResource($data), null, 'Data Stored Successfully!', 201);
        } catch (\Exception $ex) {
            return $this->ResponseError($ex->getMessage());
        }

    }

    public function index()
    {
        $perPage = request('per_page');
        $data = $this->brandRepository->allPaginated($perPage);
        if (!$data) {
            return $this->ResponseError([], null, 'No Data Found', 200, 'error');
        }
        $metadata['count'] = count($data);
        return $this->ResponseSuccess($data, $metadata);
    }
    public function allBrands()
    {
        $brands = $this->brandRepository->all();
        if (!$brands) {
            return $this->ResponseError([], null, 'No Data Found', 200, 'error');
        }
        $metadata['count'] = count($brands);
        return $this->ResponseSuccess(BrandResource::collection($brands), $metadata);
    }

    public function show($id)
    {
        $brand = $this->brandRepository->show($id);
        if (!$brand) {
            return $this->ResponseError([],null,'No Data Found',200,'error');
        }
        return $this->ResponseSuccess(new BrandResource($brand));
    }

    public function update(Request $request, $id){
        try {
            $data = $this->brandRepository->update($request,$id);
            return $this->ResponseSequence(new BrandResource($data), null, 'Data Updated Successfully!', 201);
        } catch (\Exception $ex) {
            return $this->ResponseError($ex->getMessage());
        }
    }

    public function destroy($id){
        try {
            $data = $this->brandRepository->delete($id);
            return $this->ResponseSequence($data, null, 'Data Deleted Successfully!', 204);
        } catch (\Exception $ex) {
            return $this->ResponseError($ex->getMessage());
        }
    }

    public function status($id){
        try {
            $data = $this->brandRepository->status($id);
            return $this->ResponseSequence($data, null, 'Data Deleted Successfully!', 204);
        } catch (\Exception $ex) {
            return $this->ResponseError($ex->getMessage());
        }
    }
}
