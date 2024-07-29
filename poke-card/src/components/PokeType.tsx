import './PokeApp.css'
import fire from '../assets/icons/fire.svg'

function PokemonType(){
    return(
        <>
        <div className='TypeContainer'>
        <img src={fire} alt="Fire Type"/>
            <p>Fire</p>
        </div>
        </>
    )
}

export default PokemonType