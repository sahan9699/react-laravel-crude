<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => substr($this->content,0,20,) . '...',
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name
            ],
            'created_at' => $this->created_at->toDateTimeString()
        ];
    }
}
