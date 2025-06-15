import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import { RootStackParamList } from '../App';
import { getPokemons, getPokemonDetails } from '../services/api';
import { Pokemon } from '../types/Pokemon';
import { PokemonCard } from '../components/PokemonCard';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PokedexScreen = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const limit = 30;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');
        const list = await getPokemons(limit, offset);
        const details = await Promise.all(list.map(p => getPokemonDetails(p.url)));
        setPokemons(details);
      } catch (err) {
        setError('Falha ao carregar Pokémons. Verifique sua conexão.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const loadMorePokemons = async () => {
    if (isFetchingMore) return;
    try {
      setIsFetchingMore(true);
      const newOffset = offset + limit;
      const list = await getPokemons(limit, newOffset);
      const details = await Promise.all(list.map(p => getPokemonDetails(p.url)));
      setPokemons(prev => [...prev, ...details]);
      setOffset(newOffset);
    } catch (err) {
      setError('Falha ao carregar mais Pokémons.');
    } finally {
      setIsFetchingMore(false);
    }
  };

  const filtered = pokemons.filter(p => p.name.includes(search.toLowerCase()));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}></Text>
      <TextInput
        placeholder="Buscar pokémon..."
        style={styles.input}
        onChangeText={setSearch}
      />
      {isLoading && <ActivityIndicator size="large" color="#6200ee" />}
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      {!isLoading && !error && (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              onPress={() => navigation.navigate('PokemonDetail', { pokemon: item })}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>
              {search && filtered.length === 0
                ? `Nenhum Pokémon encontrado para '${search}'`
                : pokemons.length === 0 && !isLoading
                ? 'Nenhum Pokémon para exibir no momento'
                : null}
            </Text>
          )}
          ListFooterComponent={() => isFetchingMore ? <ActivityIndicator size="small" color="#6200ee" /> : null}
          onEndReached={loadMorePokemons}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  input: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    fontSize: 16,
    color: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  error: { color: 'red', textAlign: 'center', marginBottom: 12 },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' },
});