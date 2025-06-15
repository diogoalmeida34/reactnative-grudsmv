import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPokemonSpecies } from '../services/api';
import { Pokemon } from '../types/Pokemon';
import { capitalize } from '../utils/format';
import { RootStackParamList } from '../App';

type PokemonDetailRouteProp = RouteProp<RootStackParamList, 'PokemonDetail'>;

export const PokemonDetailScreen = () => {
  const route = useRoute<PokemonDetailRouteProp>();
  const { pokemon } = route.params;
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        setIsLoading(true);
        setError('');
        const speciesData = await getPokemonSpecies(pokemon.id);
        const enDescription = speciesData.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'en'
        );
        setDescription(enDescription?.flavor_text || 'Descrição não disponível.');
      } catch (err) {
        setError('Falha ao carregar descrição.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSpeciesData();
  }, [pokemon.id]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <View style={styles.types}>
        {pokemon.types.map((type, index) => (
          <Text key={index} style={styles.type}>
            {capitalize(type)}
          </Text>
        ))}
      </View>
      <Text style={styles.label}>Altura: {(pokemon.height / 10).toFixed(1)} m</Text>
      <Text style={styles.label}>Peso: {(pokemon.weight / 10).toFixed(1)} kg</Text>
      {isLoading && <ActivityIndicator size="large" color="#6200ee" />}
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      {!isLoading && !error && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, alignItems: 'center' },
  name: { fontSize: 28, fontWeight: 'bold', marginVertical: 12 },
  image: { width: 200, height: 200 },
  types: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 12 },
  type: {
    backgroundColor: '#6200ee',
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    margin: 4,
  },
  label: { fontSize: 16, marginVertical: 4 },
  description: { fontSize: 14, textAlign: 'center', marginVertical: 12, color: '#666' },
  error: { color: 'red', textAlign: 'center', marginVertical: 12 },
});