<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProductController;
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

Route::get('/dashboard-info', [DashboardController::class, 'index']);
Route::get('/get-notifications', [DashboardController::class, 'getNotifications']);
Route::get('/mark-as-readall', [DashboardController::class, 'markAsReadAll']);

Route::get('/all-categories', [CategoryController::class, 'allCategories']);
Route::get('/categories/status/{id}', [CategoryController::class, 'status']);
Route::apiResource('categories', CategoryController::class);

Route::get('/all-brands', [BrandController::class, 'allBrands']);
Route::apiResource('brands', BrandController::class);

Route::get('/all-customers', [CustomerController::class, 'allCustomers']);
Route::apiResource('customers', CustomerController::class);

Route::get('/all-suppliers', [SupplierController::class, 'allSuppliers']);
Route::apiResource('suppliers', SupplierController::class);

Route::get('/all-staffs', [StaffController::class, 'allStaffs']);
Route::apiResource('staffs', StaffController::class);

Route::get('/all-products', [ProductController::class, 'allProducts']);
Route::apiResource('products', ProductController::class);

Route::get('/all-expenses', [ExpenseController::class, 'allExpense']);
Route::get('/all-expenses-category', [ExpenseController::class, 'allExpenseCategory']);
Route::apiResource('/expenses', ExpenseController::class)->except(['destroy']);

Route::apiResource('/salaries', SalaryController::class);

Route::get('/carts', [CartController::class, 'getCartItems']);
Route::post('/add-to-cart', [CartController::class, 'addToCart']);
Route::get('/remove-from-cart/{id}', [CartController::class, 'removeFromCart']);
Route::get('/increase-item-qty/{id}', [CartController::class, 'incItemQty']);
Route::get('/decrease-item-qty/{id}', [CartController::class, 'decItemQty']);

Route::get('/all-orders', [OrderController::class, 'allOrders']);
Route::apiResource('/orders', OrderController::class)->only(['index', 'store', 'show']);
