<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public static function middleware(): array
    {
        return [
            'auth' => 'auth:api',
        ];
    }

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        if (JWTAuth::user()->role !== 'admin') {
            return response()->json(['error' => 'Apenas administradores podem criar utilizadores'], 403);
        }

        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|between:2,100',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'in:admin,maestro,musico',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => Hash::make($request->password)]
        ));

        return response()->json(['message' => 'Utilizador criado com sucesso', 'user' => $user], 201);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        if (JWTAuth::user()->role !== 'admin') {
            return response()->json(['error' => 'Apenas administradores podem editar utilizadores'], 403);
        }

        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nome' => 'string|between:2,100',
            'email' => 'email|unique:users,email,' . $id,
            'password' => 'string|min:6',
            'role' => 'in:admin,maestro,musico',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user->update(array_merge(
            $validator->validated(),
            $request->password ? ['password' => Hash::make($request->password)] : []
        ));

        return response()->json(['message' => 'Utilizador atualizado com sucesso', 'user' => $user]);
    }

    public function destroy($id)
    {
        if (JWTAuth::user()->role !== 'admin') {
            return response()->json(['error' => 'Apenas administradores podem eliminar utilizadores'], 403);
        }

        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Utilizador eliminado com sucesso']);
    }
}
