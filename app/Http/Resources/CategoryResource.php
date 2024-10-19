<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'category_id' => $this->id,
            'category_name' => $this->name,
            'category_slug' => $this->slug,
            'category_code' => $this->code,
            'category_file' => $this->file,
            'is_active' => $this->is_active ? 'active' : 'inactive',
            'created_at' => $this->created_at->format('d/M/Y H: i A'),
        ];
    }
}
