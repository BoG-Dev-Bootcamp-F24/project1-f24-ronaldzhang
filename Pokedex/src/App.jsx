import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);
  const [attributes, setAttributes] = useState('info');

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, [pokemonId]);

  const next = () => setPokemonId((currId) => currId + 1);
  const prev = () => setPokemonId((currId) => (currId > 1 ? currId - 1 : 1));

  return (
    <div>
      {pokemon && (
        <div>
          <h1>Bits of Good Mid-Semester Project</h1>
          <div>
            <img src = {pokemon.sprites.front_default} />
            <p>{pokemon.name}</p>
            <p><b>Types:</b></p>
            <div>
              {pokemon.types.map((typeInfo, index) => (
                <span key={index}>{typeInfo.type.name}</span>
              ))}
            </div>
          </div>
          <div>
            <button onClick={prev}>{'<'}</button>
            <button onClick={next}>{'>'}</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
