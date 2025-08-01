import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../client";
import "./Details.css";

const Details = () => {
    const [pokemon, setPokemon] = useState({species: "", nickname: "", type: "", ability: "", item: ""});
    const { id } = useParams();
    const numericId = parseInt(id, 10);
    const [image, setImage] = useState("");

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

            const query = `https://pokeapi.co/api/v2/pokemon/${data.species}`;
            const response = await fetch(query);
            const json = await response.json();

            if (json && json.sprites) {
                setImage(json.sprites.front_default);
            };
        };

        currentTeammate().catch(console.error);
    }, [id])

    return (
        <>
            <h1>Details</h1> <br/>
            <p>Image of {pokemon.nickname}</p>
            <img src={image}></img>

            <div className="details-layout">
                <div>
                    <h3>Species</h3>
                    <p>{pokemon.species}</p>
                </div>

                <div>
                    <h3>Type</h3>
                    <p>{pokemon.type}</p>
                </div>

                <div>
                    <h3>Ability</h3>
                    <p>{pokemon.ability}</p>
                </div>
                
                <div>
                    <h3>Item</h3>
                    <p>{pokemon.item}</p> <br/>
                </div>
            </div>

            <Link to="/view-team"><button type="button">Back to Team View</button></Link>
            <br></br>
            <Link to={`/edit-teammate/${id}`}><button type="button">Edit this Pokémon</button></Link>
        </>
    );
};

export default Details;