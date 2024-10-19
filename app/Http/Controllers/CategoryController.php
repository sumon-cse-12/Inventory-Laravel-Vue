<?php

namespace App\Http\Controllers;

use App\Trait\ApiResponse;
use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Repositories\Category\CategoryRepository;

class CategoryController extends Controller
{
    use ApiResponse;
    protected $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function store(CategoryRequest $request)
    {

        try {
            $data = $this->categoryRepository->store($request);
            return $this->ResponseSequence(new CategoryResource($data), null, 'Data Stored Successfully!', 201);
        } catch (\Exception $ex) {
            return $this->ResponseError($ex->getMessage());
        }

    }

    public function index()
    {
        $perPage = request('per_page');
        $data = $this->categoryRepository->allPaginated($perPage);
        if (!$data) {
            return $this->ResponseError([], null, 'No Data Found', 200, 'error');
        }
        $metadata['count'] = count($data);
        return $this->ResponseSuccess($data, $metadata);
    }
    public function allCategories()
    {
        $categories = $this->categoryRepository->all();
        if (!$categories) {
            return $this->ResponseError([], null, 'No Data Found', 200, 'error');
        }
        $metadata['count'] = count($categories);
        return $this->ResponseSuccess(CategoryResource::collection($categories), $metadata);
    }

    public function show($id)
    {
        $category = $this->categoryRepository->show($id);
        if (!$category) {
            return $this->ResponseError([],null,'No Data Found',200,'error');
        }
        return $this->ResponseSuccess(new CategoryResource($category));
    }

    public function update(Request $request, $id){
        try {
            $data = $this->categoryRepository->update($request,$id);
            return $this->ResponseSequence(new CategoryResource($data), null, 'Data Updated Successfully!', 201);
        } catch (\Exception $ex) {
            return $this->ResponseError($ex->getMessage());
        }
    }

    public function destroy($id){
        try {
            $data = $this->categoryRepository->delete($id);
            return $this->ResponseSequence($data, null, 'Data Deleted Successfully!', 204);
        } catch (\Exception $ex) {
            return $this->ResponseError($ex->getMessage());
        }
    }

    public function status($id){
        try {
            $data = $this->categoryRepository->status($id);
            return $this->ResponseSequence($data, null, 'Data Deleted Successfully!', 204);
        } catch (\Exception $ex) {
            return $this->ResponseError($ex->getMessage());
        }
    }
}
