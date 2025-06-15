# Exercício 2: Proposta de Refatoração para MVP ou MVVM

## Padrão Escolhido: `MVVM (Model-View-ViewModel)`

**Justificativa**: O padrão MVVM foi escolhido por permitir uma clara separação entre a lógica de apresentação e a interface, promovendo modularidade e testabilidade. É adequado para React Native, aproveitando hooks como `useState` e `useEffect` para gerenciar estados reativos no ViewModel, ideal para a lógica simples da Pokédex (busca, filtro e paginação).

---

## Nova Estrutura de Arquivos

```
PokedexApp/
├─ .expo/
├─ assets/
├─ components/
│  └─ PokemonCard.tsx
├─ node_modules/
├─ screens/
│  └─ Pokedex/
│     ├─ PokedexScreen.tsx         # View (componente de UI)
│     └─ usePokedexViewModel.ts    # ViewModel (lógica de negócios e estado)
├─ services/
│  └─ api.ts                      # Serviço de API (getPokemons)
├─ types/
│  ├─ Navigation.ts
│  └─ Pokemon.ts
├─ utils/
│  └─ format.ts
├─ .gitignore
├─ app.json
├─ App.tsx
├─ index.ts
├─ package-lock.json
├─ package.json
└─ tsconfig.json
```

- **PokedexScreen.tsx**: Renderização da UI e captura de interações do usuário.
- **usePokedexViewModel.ts**: Hook com lógica de negócios, estado e interações com a API.
- **api.ts**: Função `getPokemons` para chamadas à API.

---

## Divisão de Responsabilidades

### View (PokedexScreen.tsx)

Responsabilidades:
- Renderizar a UI (TextInput, FlatList, ActivityIndicator, etc.).
- Capturar interações do usuário (digitação, rolagem).
- Consumir estados e funções do ViewModel via `usePokedexViewModel`.

A View não terá lógica de negócios (ex.: chamadas à API ou filtragem).

### ViewModel (usePokedexViewModel.ts)

Responsabilidades:
- **Estados**:
  - `pokemons`: Lista completa de Pokémon.
  - `filteredPokemons`: Lista filtrada por busca.
  - `isLoading`: Carregamento inicial.
  - `isLoadingMore`: Carregamento de mais itens.
  - `error`: Mensagens de erro.
  - `searchQuery`: Texto de busca.
  - `hasMore`: Indica se há mais Pokémon.
- **Funções**:
  - `setSearchQuery`: Atualiza a busca e dispara filtro.
  - `loadMorePokemons`: Carrega mais Pokémon ao rolar.

Usa `useEffect` para carregar dados iniciais, filtrar e gerenciar paginação.

---

## Fluxo de Dados

### Exemplo: Usuário digita no campo de busca

1. **Usuário digita no TextInput**:
   - A View captura o texto via `onChangeText` e chama `setSearchQuery`.
2. **ViewModel atualiza estado**:
   - O `usePokedexViewModel` atualiza `searchQuery`.
3. **Filtro é aplicado**:
   - Um `useEffect` filtra `pokemons` e atualiza `filteredPokemons`.
4. **View atualiza UI**:
   - A `FlatList` re-renderiza com `filteredPokemons`.
5. **Exibe mensagens**:
   - Se vazio, exibe "Nenhum Pokémon encontrado para '[termo]'".

### Diagrama Simples

```
Usuário -> [TextInput: onChangeText] -> ViewModel: setSearchQuery -> [useEffect: filtra pokemons] -> View: atualiza FlatList
```

---

## Benefícios da Refatoração

- **Separação de Responsabilidades**: View foca em UI; ViewModel gerencia lógica.
- **Testabilidade**: ViewModel pode ser testado isoladamente.
- **Manutenibilidade**: Lógica centralizada facilita alterações.
- **Reusabilidade**: ViewModel pode ser reutilizado.

Isso faz com que a Pokédex seja completamente escalável e alinhada às melhores práticas de React Native.