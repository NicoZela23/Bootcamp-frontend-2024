import CardContainer from './components/PokeCard'
import PokemonImage from './components/PokeImage'
import PokemonInfo from './components/PokeInfo'
import PokemonType from './components/PokeType'

function App() {
  return (
    <>
    <CardContainer>
    <PokemonType/>
      <PokemonInfo/>
    <PokemonImage/>
    </CardContainer> 
    </>
  )
}

export default App
