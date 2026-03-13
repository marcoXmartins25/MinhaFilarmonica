<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Presenca;
use App\Models\Evento;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class PresencaController extends Controller
{
    public static function middleware(): array
    {
        return [
            'auth' => 'auth:api',
        ];
    }

    public function index(Request $request)
    {
        $user = auth()->user();

        if ($user->role === 'musico') {
            $presencas = Presenca::where('user_id', $user->id)
                ->with('evento')
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $presencas = Presenca::with(['evento', 'user:id,nome,role'])
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response()->json($presencas);
    }

    public function porEvento($eventoId)
    {
        $user = auth()->user();
        $evento = Evento::findOrFail($eventoId);

        if ($user->role === 'musico') {
            return response()->json(['error' => 'Acesso não autorizado'], 403);
        }

        $presencas = Presenca::where('evento_id', $eventoId)
            ->with('user:id,nome,role')
            ->get();

        $musicos = User::where('role', 'musico')->get();

        return response()->json([
            'evento' => $evento,
            'presencas' => $presencas,
            'musicos' => $musicos
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        $eventoId = $request->evento_id;

        $evento = Evento::findOrFail($eventoId);

        $validator = Validator::make($request->all(), [
            'evento_id' => 'required|exists:eventos,id',
            'status' => 'required|in:presente,ausente,justificado',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $presenca = Presenca::updateOrCreate(
            ['evento_id' => $eventoId, 'user_id' => $user->id],
            ['status' => $request->status]
        );

        return response()->json(['message' => 'Presença registada com sucesso', 'presenca' => $presenca], 201);
    }

    public function marcar(Request $request, $eventoId)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:presente,ausente,justificado',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $presenca = Presenca::updateOrCreate(
            ['evento_id' => $eventoId, 'user_id' => $user->id],
            ['status' => $request->status]
        );

        return response()->json(['message' => 'Presença marcada com sucesso', 'presenca' => $presenca]);
    }

    public function update(Request $request, $id)
    {
        $user = auth()->user();

        if (!in_array($user->role, ['admin', 'maestro'])) {
            return response()->json(['error' => 'Apenas administradores e maestros podem editar presenças'], 403);
        }

        $presenca = Presenca::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:presente,ausente,justificado',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $presenca->update($validator->validated());

        return response()->json(['message' => 'Presença atualizada com sucesso', 'presenca' => $presenca]);
    }

    public function destroy($id)
    {
        $user = auth()->user();

        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Apenas administradores podem eliminar presenças'], 403);
        }

        $presenca = Presenca::findOrFail($id);
        $presenca->delete();

        return response()->json(['message' => 'Presença eliminada com sucesso']);
    }
}
