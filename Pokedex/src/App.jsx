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

  const next = () => setPokemonId((prevId) => prevId + 1);
  const prev = () => setPokemonId((prevId) => (prevId > 1 ? prevId - 1 : 1));

  return (
    <div>
      {pokemon && (
        <div>
          <h1>Bits of Good Mid-Semester Project</h1>
          <div>
            <img>{pokemon.sprites.front_defualt}</img>
            <p>{pokemon.name}</p>
            <p><b>Types:</b></p>
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
