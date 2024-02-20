'use client';

import PokemonCard from '@/components/PokemonCard';
import { useEffect, useState } from 'react';
import { fetchPokemonList } from './api/pokeApi';
import IPokemonList from './interfaces/IPokemonList';
import { Button } from '@/components/ui/button';

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState<IPokemonList[]>([]);
  const [previousPokemon, setPreviousPokemon] = useState<string | null>('');
  const [nextPokemon, setNextPokemon] = useState<string | null>(null);
  console.log(nextPokemon, previousPokemon);

  const fetchData = async (url: string): Promise<void> => {
    try {
      const response = await fetchPokemonList(url);
      setPokemonList(response.results);
      setPreviousPokemon(response.previous);
      setNextPokemon(response.next);
    } catch (error) {
      console.error('Error fetching pokemon list:', error);
    }
  };

  const handlePreviousPokemon = async (): Promise<void> => {
    if (previousPokemon) {
      fetchData(previousPokemon);
    }
  };

  const handleNextPokemon = async (): Promise<void> => {
    if (nextPokemon) {
      fetchData(nextPokemon);
    }
  };

  useEffect(() => {
    fetchData('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9');
  }, []);

  return (
    <>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-3">
        <Button
          className="flex justify-center"
          disabled={!previousPokemon}
          onClick={handlePreviousPokemon}
        >
          Previous
        </Button>
        <Button
          className="flex justify-center"
          disabled={!nextPokemon}
          onClick={handleNextPokemon}
        >
          Next
        </Button>
      </div>
    </>
  );
}
