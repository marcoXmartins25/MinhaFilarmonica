<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evento;
use Illuminate\Support\Facades\Validator;

class EventoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $eventos = Evento::with('createdBy:id,nome')->orderBy('data', 'asc')->get();
        return response()->json($eventos);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        if (!in_array($user->role, ['admin', 'maestro'])) {
            return response()->json(['error' => 'Apenas administradores e maestros podem criar eventos'], 403);
        }

        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'data' => 'required|date',
            'hora' => 'required',
            'local' => 'required|string|max:255',
            'tipo' => 'required|in:ensaio,actuacao,festa',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $evento = Evento::create(array_merge(
            $validator->validated(),
            ['created_by' => $user->id]
        ));

        return response()->json(['message' => 'Evento criado com sucesso', 'evento' => $evento], 201);
    }

    public function show($id)
    {
        $evento = Evento::with(['createdBy:id,nome', 'presencas.user:id,nome'])->findOrFail($id);
        return response()->json($evento);
    }

    public function update(Request $request, $id)
    {
        $user = auth()->user();
        $evento = Evento::findOrFail($id);

        if ($user->role !== 'admin' && $user->role !== 'maestro') {
            return response()->json(['error' => 'Apenas administradores e maestros podem editar eventos'], 403);
        }

        if ($user->role === 'maestro' && $evento->created_by !== $user->id) {
            return response()->json(['error' => 'Apenas o criador do evento pode editá-lo'], 403);
        }

        $validator = Validator::make($request->all(), [
            'titulo' => 'string|max:255',
            'descricao' => 'nullable|string',
            'data' => 'date',
            'hora' => '',
            'local' => 'string|max:255',
            'tipo' => 'in:ensaio,actuacao,festa',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $evento->update($validator->validated());

        return response()->json(['message' => 'Evento atualizado com sucesso', 'evento' => $evento]);
    }

    public function destroy($id)
    {
        $user = auth()->user();
        $evento = Evento::findOrFail($id);

        if ($user->role !== 'admin' && $user->role !== 'maestro') {
            return response()->json(['error' => 'Apenas administradores e maestros podem eliminar eventos'], 403);
        }

        if ($user->role === 'maestro' && $evento->created_by !== $user->id) {
            return response()->json(['error' => 'Apenas o criador do evento pode eliminá-lo'], 403);
        }

        $evento->delete();

        return response()->json(['message' => 'Evento eliminado com sucesso']);
    }
}
