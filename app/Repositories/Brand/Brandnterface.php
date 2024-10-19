<?php

namespace App\Repositories\Brand;

interface BrandInterface
{
    public function store($request);
    public function allPaginated($perPage);
    public function all();
    public function show($id);
    public function update($request, $id);
    public function delete($id);
    public function status($id);
}
