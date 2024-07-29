import React, { ReactNode } from 'react';

interface CardContainerProps {
  children: ReactNode;
}

import './PokeApp.css'
import pokeBall from '../assets/BackgroundPokeball.png'

const  CardContainer: React.FC<CardContainerProps> = ({children}) => {
    return(
        <>
        <div className='Pokemon-info-container'>
            {children}
            <img className='Pokeball' src={pokeBall} alt="Pokeball" />
        </div>
        </>
    )
}

export default CardContainer