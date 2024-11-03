<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Brand\BrandInterface;
use App\Repositories\Brand\BrandRepository;
use App\Repositories\Category\CategoryInterface;
use App\Repositories\Supplier\SupplierInterface;
use App\Repositories\Category\CategoryRepository;
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
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
