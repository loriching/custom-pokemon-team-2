import { useState, useEffect } from "react";
import { supabase } from "../client";

const AddTeammate = () => {
    const [pokemon, setPokemon] = useState({species: "", nickname: "", type: "", ability: "", item: ""});
    const [teamSize, setTeamSize] = useState(0);

    const createPokemon = async(event) => {
        event.preventDefault();

        await supabase
            .from("Pokemon Team")
            .insert({species: pokemon.species, nickname: pokemon.nickname, type: pokemon.type, ability: pokemon.ability, item: pokemon.item})
            .select();

        window.location = "/view-team";
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPokemon( (prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    };

    useEffect(() => {
        const teamSize = async() => {
            const { data, error } = await supabase
                .from("Pokemon Team")
                .select("*");
            
            if (error) {
                console.error("Error fetching from Supabase: ", error);
            }
            console.log(data.length);
            setTeamSize(data.length);
        };

        teamSize().catch(console.error);
    }, []);

    return (
        <>
            <br></br>
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

                <input type="submit" value="Add Pokémon" onClick={createPokemon} disabled={teamSize >= 6}/>
            </form>

            

            {teamSize >= 6 && <h5>Team is full, you cannot add a member right now.</h5>}
        </>
    );
};

export default AddTeammate;