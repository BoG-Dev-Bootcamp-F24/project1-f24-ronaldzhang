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

  const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  return (
    <div>
      {pokemon && (
        <>
          <div>
            <h1>Bits of Good Mid-Semester Project</h1>
            <div>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p id='pokeName'>{pokemon.name}</p>
              <p><b>Types:</b></p>
              <div>
                {pokemon.types.map((typeInfo, index) => (
                  <span key={index}className='pokeTypes'style={{ backgroundColor: typeColors[typeInfo.type.name] }}>{typeInfo.type.name}</span>
                ))}
              </div>
            </div>
            <div>
              <button onClick={prev}>{'<'}</button>
              <button onClick={next}>{'>'}</button>
            </div>
          </div>

          <div>
            <h2><b>{attributes === 'info' ? 'Info' : 'Moves'}</b></h2>
            <div>
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
