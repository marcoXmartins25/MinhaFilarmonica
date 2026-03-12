# Guia de Execução - Frontend + Backend Ligados

## ✅ Configuração Concluída

O frontend e backend estão agora configurados para funcionarem em conjunto.

### Alterações Feitas

#### Backend (`backend/Program.cs`)
- ✅ Adicionada configuração CORS para permitir pedidos do frontend
- ✅ Política `AllowFrontend` permite qualquer origem, header e método

#### Frontend (`frontend/`)
- ✅ Criado `services/api.ts` - serviço de API para comunicação com backend
- ✅ Atualizado `app/index.tsx` - tela que mostra dados da API
- ✅ Interface `WeatherForecast` tipada
- ✅ Estados de loading, erro e dados implementados
- ✅ Pull-to-refresh disponível

---

## 🚀 Como Executar

### Passo 1: Iniciar o Backend

```bash
cd backend
dotnet run --launch-profile http
```

**URL do Backend:** http://localhost:5078
**Endpoint API:** http://localhost:5078/weatherforecast

### Passo 2: Iniciar o Frontend

Numa nova janela terminal:

```bash
cd frontend
npx expo start
```

### Passo 3: Abrir a Aplicação

- **Android Emulator:** Pressione `a` no terminal
- **iOS Simulator:** Pressione `i` no terminal
- **Expo Go:** Scan do QR code com a app Expo Go no telemóvel

---

## 📱 O que Vais Ver

A aplicação mostra:
1. **Título:** "Minha Filarmónica 🎺"
2. **Subtítulo:** "Previsão do Tempo (Backend ASP.NET Core)"
3. **Cards** com 5 previsões do tempo:
   - Data formatada
   - Temperatura em °C e °F
   - Descrição (Freezing, Bracing, Chilly, etc.)

### Funcionalidades da UI
- 🔄 **Pull-to-refresh:** Puxa para baixo para atualizar os dados
- ⏳ **Loading indicator:** Mostra enquanto carrega
- ❌ **Mensagem de erro:** Se o backend não estiver disponível
- 🔁 **Botão tentar novamente:** Para recarregar após erro

---

## 🔧 Notas Importantes

### Para usar no telemóvel (Expo Go)

Se estiveres a testar no telemóvel físico, atualiza o ficheiro `frontend/services/api.ts`:

```typescript
// Substituir localhost pelo IP da tua máquina na rede
const API_BASE_URL = 'http://192.168.1.100:5078';  // Altera para o teu IP
```

Para descobrir o teu IP:
- **Windows:** Executa `ipconfig` e procura "Endereço IPv4"
- **Mac/Linux:** Executa `ifconfig` ou `ip addr`

### Portas Utilizadas

| Serviço | Porta | URL |
|---------|-------|-----|
| Backend HTTP | 5078 | http://localhost:5078 |
| Backend HTTPS | 7256 | https://localhost:7256 |
| Frontend (Metro) | 8081 | npx expo start |

---

## 🛠️ Estrutura dos Serviços

```
frontend/
├── services/
│   └── api.ts          # Comunicação com backend
├── app/
│   ├── _layout.tsx     # Layout base
│   └── index.tsx       # Tela principal (consumo API)
```

---

## ✅ Testar a Ligação

1. Abre o browser em: http://localhost:5078/weatherforecast
   - Deves ver JSON com 5 previsões do tempo

2. No frontend, deves ver os mesmos dados formatados em cards

3. Se vires "Erro ao carregar dados", verifica:
   - Backend está a correr (`dotnet run`)
   - URL no `api.ts` está correta
   - Porta 5078 não está bloqueada

---

Pronto para usar! 🎉
