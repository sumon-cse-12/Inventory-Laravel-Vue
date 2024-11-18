<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Brand\BrandInterface;
use App\Repositories\Staff\StaffInterface;
use App\Repositories\Brand\BrandRepository;
use App\Repositories\Staff\StaffRepository;
use App\Repositories\Salary\SalaryInterface;
use App\Repositories\Salary\SalaryRepository;
use App\Repositories\Expense\ExpenseInterface;
use App\Repositories\Product\ProductInterface;
use App\Repositories\Expense\ExpenseRepository;
use App\Repositories\Product\ProductRepository;
use App\Repositories\Category\CategoryInterface;
use App\Repositories\Customer\CustomerInterface;
use App\Repositories\Supplier\SupplierInterface;
use App\Repositories\Category\CategoryRepository;
use App\Repositories\Customer\CustomerRepository;
use App\Repositories\Supplier\SupplierRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(CategoryInterface::class, CategoryRepository::class);
        $this->app->bind(BrandInterface::class, BrandRepository::class);
        $this->app->bind(SupplierInterface::class, SupplierRepository::class);
        $this->app->bind(CustomerInterface::class, CustomerRepository::class);
        $this->app->bind(StaffInterface::class, StaffRepository::class);
        $this->app->bind(ProductInterface::class, ProductRepository::class);
        $this->app->bind(ExpenseInterface::class, ExpenseRepository::class);
        $this->app->bind(SalaryInterface::class, SalaryRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
