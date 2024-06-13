import React from 'react'
import { useState, useEffect } from 'react';
import Buscador from './Buscador';

function MiAPI() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");


    const url = "https://pokeapi.co/api/v2/pokemon?limit=120"

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data.results);
            setLoading(false);
        } catch (error) {
            console.error('error------->', error);
            setError(error);
            setLoading(false);
        }}
        //console.log(data)

        const filteredData = data.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()))

        const sortedData =filteredData.sort((a,b) => a.name.localeCompare(b.name))

        if (loading) {
            return ( <div>loading</div>)
        }

        if (error) {
            return ( <div>ERROR: {error.message} </div>)
        }
  return (
    <div>

        <h2>Lista de Pokemon</h2>
        <Buscador 
            query = {query}
            setQuery = {setQuery}/>
        <ul>
            {filteredData.map((pokemon) =>(
                <li key={pokemon.name}><a href={pokemon.url}>{pokemon.name}</a></li>
            ))}
        </ul>

    </div>

  );
}

export default MiAPI