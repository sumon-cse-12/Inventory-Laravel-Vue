<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
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




// Define API routes for CategoryController
// Route::prefix('categories')->group(function () {
//     Route::get('/', [CategoryController::class, 'index'])->name('categories.index');
//     Route::post('/store', [CategoryController::class, 'store'])->name('categories.store');
//     Route::get('/show/{id}', [CategoryController::class, 'show'])->name('categories.show');
//     Route::put('update/{id}', [CategoryController::class, 'update'])->name('categories.update');
//     Route::delete('{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
// });
Route::get('/all-categories', [CategoryController::class, 'allCategories']);
Route::apiResource('categories', CategoryController::class);
