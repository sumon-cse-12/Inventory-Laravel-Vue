<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SupplierController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/all-categories', [CategoryController::class, 'allCategories']);
Route::get('/categories/status/{id}', [CategoryController::class, 'status']);
Route::apiResource('categories', CategoryController::class);

Route::get('/all-brands', [BrandController::class, 'allBrands']);
Route::apiResource('brands', BrandController::class);
Route::get('/all-customers', [BrandController::class, 'allCustomer']);
Route::apiResource('customers', CustomerController::class);
Route::get('/all-suppliers', [BrandController::class, 'allSuppliers']);
Route::apiResource('suppliers', SupplierController::class);
