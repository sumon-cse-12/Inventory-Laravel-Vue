<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    public const ADMIN = 1;
    public const STAFF = 2;
    public const CUSTOMER = 3;
    public const SUPPLIER = 4;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function scopeSupplier()
    {
        return $this->where(['role_id' => User::SUPPLIER]);
    }
    public function scopeCustomer()
    {
        return $this->where(['role_id' => User::CUSTOMER]);
    }
    public function scopeAdmin()
    {
        return $this->where(['role_id' => User::ADMIN]);
    }
    public function scopeStaff()
    {
        return $this->where(['role_id' => User::STAFF]);
    }
}
