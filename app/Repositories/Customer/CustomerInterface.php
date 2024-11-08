<?php
namespace App\Repositories\Customer;

interface CustomerInterface{
    public function store($data);
    public function allPaginate($perPage);
    public function all();
    public function show($id);
    public function update($id, $data);
    public function delete($id);
    public function status($id);
}
