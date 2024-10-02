import React, { useState, useEffect } from 'react';
import './App.css';

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
        <>
          {/* Left Column (Image, Types, Navigation) */}
          <div>
            <h1>Bits of Good Mid-Semester Project</h1>
            <div>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
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

          {/* Right Column */}
          <div>
            <h2><b>{attributes === 'info' ? 'Info' : 'Moves'}</b></h2>
            <div>
              {/* Conditionally Render Info or Moves */}
              {attributes === 'info' ? (
                <div>
                  <p>height: {pokemon.height / 10}m</p>
                  <p>weight: {pokemon.weight / 10}kg</p>
                  <ul>
                    {pokemon.stats.map((statInfo, index) => (
                      <li key={index}>
                        {statInfo.stat.name}: {statInfo.base_stat}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <ul>
                    {pokemon.moves.map((moveInfo, index) => (
                      <li key={index}>{moveInfo.move.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Toggle Buttons for Info and Moves */}
            <div className='toggleBtns'>
              <button className={attributes === 'info' ? 'active' : ''} onClick={() => setAttributes('info')}>Info</button>
              <button className={attributes === 'moves' ? 'active' : ''} onClick={() => setAttributes('moves')}>Moves</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
