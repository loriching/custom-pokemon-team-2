import { supabase } from "../client.js";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from "./Card.jsx";

const EditTeammate = ({data}) => {
    const {id} = useParams();
    const numericId = parseInt(id, 10);
    const [pokemon, setPokemon] = useState({species: "", nickname: "", type: "", ability: "", item: ""});

    useEffect(() => {
        const currentTeammate = async() => {
            const { data, error } = await supabase
                .from("Pokemon Team")
                .select("*")
                .eq("id", numericId)
                .single();
            
            if (error) {
                console.error("Error fetching from Supabase: ", error);
            }
            
            setPokemon({species: data.species, nickname: data.nickname, type: data.type, ability: data.ability, item: data.item});
        };

        currentTeammate().catch(console.error);
    }, [id]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPokemon( (prev) => {
            return {
                ...prev,
                [name]:value,
            };
        });
    };

    const updatePokemon = async(event) => {
        event.preventDefault();

        await supabase
            .from("Pokemon Team")
            .update({species: pokemon.species, nickname: pokemon.nickname, type: pokemon.type, ability: pokemon.ability, item: pokemon.item})
            .eq("id", numericId);
        
        window.location = "/view-team";

    };

    const deletePokemon = async(event) => {
        event.preventDefault();
        await supabase
            .from("Pokemon Team")
            .delete()
            .eq("id", numericId);
        
        window.location = "/view-team";
    };

    return (
        <>
            <div>
                <h2>Current features:</h2>
                <Card 
                    key={numericId}
                    id={numericId} 
                    species={pokemon.species}
                    nickname={pokemon.nickname}
                    type={pokemon.type}
                    ability={pokemon.ability}
                    item={pokemon.item}
                />
            </div>
            <div>
                <form>
                    <label htmlFor="species">Enter your Pokémon species:</label> <br />
                    <input type="text" id="species" name="species" onChange={handleChange} /><br />
                    <br/>

                    <label htmlFor="nickname">Nickname your Pokémon!</label><br />
                    <input type="text" id="nickname" name="nickname" onChange={handleChange} /><br />
                    <br/>

                    <label htmlFor="type">Enter one type for your Pokémon:</label> <br />
                    <input type="text" id="type" name="type" onChange={handleChange} /><br />
                    <br/>

                    <label htmlFor="ability">Enter an ability for your Pokémon:</label><br />
                    <input type="text" id="ability" name="ability" onChange={handleChange} /><br />
                    <br/>

                    <label htmlFor="item">Enter an item for your Pokémon:</label> <br />
                    <input type="text" id="item" name="item" onChange={handleChange} /><br />
                    <br/>

                    <input type="submit" value="Edit Pokémon" onClick={updatePokemon}/>
                </form>

                <br/>
                <button className="deleteButton" onClick={deletePokemon}>Delete</button>
            </div>
        </>
    );
};

export default EditTeammate;