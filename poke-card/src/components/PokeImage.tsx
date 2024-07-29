import './PokeApp.css'

function PokemonImage(){
    let idValue = 4;

    function getImageID(id:number){
        if (id >= 1000) {
          return id.toString();
        } else {
          const imageString = "00" + id;
          return imageString.slice(-3);
        }
      }

      const id = getImageID(idValue)
    return(
        <>
        <img className='PokemonImage' src={"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +id +".png"} alt="Pokemon" />
        </>
    )
}

export default PokemonImage