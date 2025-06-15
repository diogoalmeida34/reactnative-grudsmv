import axios from 'axios';
import { Pokemon, PokemonListItem } from '../types/Pokemon';

const API_BASE = 'https://pokeapi.co/api/v2';

export async function getPokemons(limit: number, offset: number = 0): Promise<PokemonListItem[]> {
  try {
    const res = await axios.get(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
    return res.data.results;
  } catch (error) {
    throw new Error('Erro ao buscar lista de Pokémons');
  }
}

export async function getPokemonDetails(url: string): Promise<Pokemon> {
  try {
    const res = await axios.get(url);
    return {
      id: res.data.id,
      name: res.data.name,
      image: res.data.sprites.front_default,
      types: res.data.types.map((t: any) => t.type.name),
      height: res.data.height,
      weight: res.data.weight,
    };
  } catch (error) {
    throw new Error('Erro ao buscar detalhes do Pokémon');
  }
}

export async function getPokemonSpecies(id: number): Promise<any> {
  try {
    const res = await axios.get(`${API_BASE}/pokemon-species/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Erro ao buscar descrição do Pokémon');
  }
}