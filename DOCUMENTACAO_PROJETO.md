# Documentação do Projeto - Minha Filarmónica 🎺

## Índice
1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Backend (ASP.NET Core)](#backend)
4. [Frontend (Expo/React Native)](#frontend)
5. [Configuração e Execução](#configuração-e-execução)
6. [Notas Técnicas](#notas-técnicas)

---

## Visão Geral

**Minha Filarmónica** é uma aplicação mobile desenvolvida para transformar a gestão de filarmónicas e bandas musicais. A aplicação permite organizar festas, ensaios e presenças dos músicos de forma simples, rápida e centralizada.

### Objetivo
Digitalizar e simplificar a organização das filarmónicas, proporcionando mais tempo para tocar música e menos tempo com papeladas.

### Funcionalidades Previstas
- Agenda completa: criação, edição e organização de festas, ensaios e atuações
- Gestão de músicos: lista completa com instrumentos e presença confirmada
- Notificações automáticas em tempo real
- Controle de presenças (confirmado, recusado, pendente)
- Informação detalhada: datas, locais e descrições para cada evento

---

## Estrutura do Projeto

```
MinhaFilarmonica/
├── backend/                    # API ASP.NET Core 9.0
│   ├── Controllers/
│   │   └── WeatherForecastController.cs
│   ├── Program.cs
│   ├── WeatherForecast.cs
│   ├── backend.csproj
│   ├── appsettings.json
│   └── Properties/
│       └── launchSettings.json
├── frontend/                   # Aplicação Expo/React Native
│   ├── app/
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── assets/
│   │   └── images/
│   ├── package.json
│   ├── tsconfig.json
│   └── app.json
├── .vscode/
│   └── settings.json
├── README.md
└── MinhaFilarmonica.sln
```

---

## Backend

### Tecnologias Utilizadas
- **Framework:** ASP.NET Core 9.0
- **OpenAPI/Swagger:** Microsoft.AspNetCore.OpenApi 9.0.2
- **Configuração:** Nullable enabled, ImplicitUsings enabled

### Arquivos Principais

#### `Program.cs`
Ponto de entrada da aplicação backend:
```csharp
// Configuração do builder
var builder = WebApplication.CreateBuilder(args);

// Serviços registrados
builder.Services.AddControllers();
builder.Services.AddOpenApi();  // Documentação OpenAPI

// Pipeline de requisições HTTP
- Controllers
- OpenAPI (em desenvolvimento)
- HTTPS Redirection
- Autorização
```

#### `WeatherForecastController.cs`
Controller de exemplo com endpoint para previsão do tempo:
- **Rota:** `/weatherforecast` (ou `/WeatherForecast`)
- **Método HTTP:** GET
- **Funcionalidade:** Retorna 5 previsões de tempo aleatórias
- **Campos retornados:**
  - `date`: Data da previsão
  - `temperatureC`: Temperatura em Celsius (-20 a 55°C)
  - `temperatureF`: Temperatura em Fahrenheit (calculada)
  - `summary`: Descrição textual (Freezing, Bracing, Chilly, etc.)

#### `WeatherForecast.cs`
Modelo de dados simples:
```csharp
public class WeatherForecast
{
    public DateOnly Date { get; set; }
    public int TemperatureC { get; set; }
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);  // Conversão automática
    public string? Summary { get; set; }
}
```

#### `backend.csproj`
Configuração do projeto .NET:
- TargetFramework: `net9.0`
- Pacote: `Microsoft.AspNetCore.OpenApi` versão 9.0.2

---

## Frontend

### Tecnologias Utilizadas
- **Framework:** React Native via Expo
- **Navegação:** Expo Router (file-based routing)
- **React:** Versão 19.1.0
- **React Native:** Versão 0.81.5
- **TypeScript:** Versão 5.9.2

### Dependências Principais

#### Expo SDK (~54.0.33)
- `expo-router` - Sistema de navegação baseado em ficheiros
- `expo-splash-screen` - Tela de splash
- `expo-font` - Gestão de fontes
- `expo-constants` - Constantes da aplicação
- `expo-haptics` - Feedback tátil
- `expo-image` - Processamento de imagens
- `expo-linking` - Deep linking
- `expo-status-bar` - Barra de estado
- `expo-system-ui` - UI do sistema
- `expo-web-browser` - Browser integrado

#### React Native
- `react-native-gesture-handler` - Gestos
- `react-native-reanimated` - Animações
- `react-native-safe-area-context` - Áreas seguras
- `react-native-screens` - Otimização de screens

#### Navegação
- `@react-navigation/native` - Navegação base
- `@react-navigation/bottom-tabs` - Tabs inferiores
- `@react-navigation/elements` - Elementos de UI

### Arquivos Principais

#### `app/_layout.tsx`
Layout raiz da aplicação:
```typescript
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;  // Stack navigator básico
}
```

#### `app/index.tsx`
Página inicial da aplicação:
```typescript
export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
```

#### `package.json`
Scripts disponíveis:
- `npm start` / `expo start` - Inicia o servidor de desenvolvimento
- `npm run android` - Inicia para Android
- `npm run ios` - Inicia para iOS
- `npm run web` - Inicia versão web
- `npm run lint` - Executa linting
- `npm run reset-project` - Reseta o projeto para estado inicial

---

## Configuração e Execução

### Requisitos
- .NET 9.0 SDK (para backend)
- Node.js (para frontend)
- Expo CLI

### Backend (ASP.NET Core)

1. **Navegar para a pasta backend:**
   ```bash
   cd backend
   ```

2. **Restaurar dependências:**
   ```bash
   dotnet restore
   ```

3. **Executar a aplicação:**
   ```bash
   dotnet run
   ```

4. **URLs padrão:**
   - HTTPS: `https://localhost:7001` (ou similar)
   - HTTP: `http://localhost:5000` (ou similar)
   - OpenAPI/Swagger disponível em desenvolvimento

### Frontend (Expo)

1. **Navegar para a pasta frontend:**
   ```bash
   cd frontend
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Iniciar a aplicação:**
   ```bash
   npx expo start
   ```

4. **Opções de execução:**
   - Scan QR code com app Expo Go (Android/iOS)
   - Pressionar `a` para Android emulator
   - Pressionar `i` para iOS simulator
   - Pressionar `w` para versão web

---

## Notas Técnicas

### Estado Atual do Projeto
- ✅ Backend ASP.NET Core 9.0 configurado e funcional
- ✅ Frontend Expo com React Native inicializado
- ✅ Estrutura de pastas organizada
- 🔄 API com controller de exemplo (WeatherForecast)
- 🔄 Frontend com página inicial básica

### Discrepância na Documentação
O ficheiro `README.md` principal menciona tecnologias diferentes do estado atual:
- **Documentado:** Node.js + Express + PostgreSQL
- **Real:** ASP.NET Core 9.0 + Expo/React Native

**Nota:** O backend foi alterado de Node.js/Express para ASP.NET Core, mas a documentação principal não foi atualizada.

### Próximos Passos Sugeridos
1. Definir modelos de dados para:
   - Músicos (nome, instrumento, contacto)
   - Eventos (tipo, data, local, descrição)
   - Presenças (músico, evento, estado)

2. Criar controllers da API para CRUD de:
   - Músicos
   - Eventos
   - Presenças

3. Desenvolver telas no frontend:
   - Lista de músicos
   - Calendário/agenda de eventos
   - Confirmação de presenças
   - Detalhes do evento

4. Configurar persistência de dados (adicionar Entity Framework Core + base de dados)

---

## Comandos Úteis

### Git
```bash
# Ver estado
git status

# Adicionar alterações
git add .

# Commit
git commit -m "mensagem"

# Push
git push origin main
```

### .NET CLI
```bash
# Criar novo controller
dotnet aspnet-codegenerator controller -name NovoController

# Adicionar package
dotnet add package NomeDoPacote

# Build
dotnet build

# Testes (quando houver)
dotnet test
```

### Expo
```bash
# Instalar nova dependência
npx expo install nome-do-pacote

# Atualizar Expo
npx expo update

# Eject (se necessário no futuro)
npx expo eject
```

---

**Documentação gerada em:** 12/03/2026
**Versão do projeto:** Em desenvolvimento inicial
