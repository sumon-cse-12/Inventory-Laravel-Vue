<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BrandResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'brand_id' => $this->id,
            'brand_name' => $this->name,
            'brand_slug' => $this->slug,
            'brand_code' => $this->code,
            'brand_file' => $this->file,
            'is_active' => $this->is_active ? 'active' : 'inactive',
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d') : null,
        ];
    }
}
