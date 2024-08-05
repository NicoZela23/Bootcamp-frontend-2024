import React from 'react';
import './cardStyles.css'

type Props = {
    id: number;
    name: string;
}

function getImageUrl(id: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

const PokemonCard: React.FC<Props> = ({ id, name }) => {
    return (
        <div className="card">
            <img
                className="image"
                src={getImageUrl(id)}
                alt={name}
            />
            <p className="text">{name}</p>
        </div>
    );
}

export default PokemonCard;
