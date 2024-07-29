import { useState, useEffect } from 'react';
import './PokeApp.css';

function PokemonInfo() {
  const [pokemon, setPokemon] = useState<{ id: number; name: string } | null>(null);
  const [id, setId] = useState<number>(4);

  const url = "https://pokeapi.co/api/v2/pokemon";

  async function getPokemon(id: number) {
    try {
      const response = await fetch(`${url}/${id}`);
      const data = await response.json();
      return { id: data.id, name: data.name };
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchPokemon() {
      const result = await getPokemon(id);
      if (result) {
        setPokemon(result);
      }
    }

    fetchPokemon();
  }, [id]);

  return (
    <>
      <div className='Info-Container'>
        {pokemon ? (
          <>
            <p className='Pokemon-id'>#{pokemon.id.toString().padStart(3, '0')}</p>
            <p className='Pokemon-name'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default PokemonInfo;
