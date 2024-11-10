<?php

namespace App\Repositories\Product;

interface ProductInterface{
    public function store($data);
    public function allPaginate($perPage);
    public function all();
    public function show($id);
    public function update($id, $data);
    public function delete($id);
    public function status($id);
}