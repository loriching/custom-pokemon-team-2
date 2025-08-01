import { Link } from "react-router-dom";
import "./ViewTeam.css";
import PokeCard from "./PokeCard.jsx";
import { supabase } from "../client.js";
import { useState, useEffect } from "react";

const ViewTeam = () => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        const fetchTeam = async() => {
            const {data} = await supabase 
                .from("Pokemon Team")
                .select()
                .order("created_at", {ascending: true});
            setTeam(data);
        };
        fetchTeam();
    }, []);

    return (
        <>  
            <p>Current team size: {team.length} / 6</p>

            {(team && team.length < 6) ? 
                <Link to="/add-teammate"><button type="button">Add Pokémon</button></Link>                
                : <div> <button type="button" disabled>Add Pokémon</button> </div>  
            }

            <br/><br/>

            {
                team && team.length > 0 ?
                [...team]
                .map((p,index) => 
                    <div className="pokecard-layout">
                    <PokeCard 
                        key={p.id}
                        id={p.id} 
                        species={p.species}
                        nickname={p.nickname}
                        type={p.type}
                        ability={p.ability}
                        item={p.item}
                    /></div>
                ) : <h2>No Teammates Yet</h2>
            }
        </>
    );
};

export default ViewTeam;