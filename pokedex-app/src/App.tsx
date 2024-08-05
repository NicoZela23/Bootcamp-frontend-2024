import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';
import PokemonCard from './components/Card';
import { usePokemon } from './hooks/pokemonHook';

const App: React.FC = () => {
    const { pokemons, loadMore } = usePokemon();

    return (
        <div className="container">
            <InfiniteScroll
                dataLength={pokemons.length}
                next={loadMore}
                hasMore={true}
                loader={<p className="loading">Loading...</p>}
            >
                {pokemons.map(pokemon => (
                    <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default App;
