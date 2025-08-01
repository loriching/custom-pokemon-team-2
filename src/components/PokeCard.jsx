import { Link } from "react-router-dom";
import "./PokeCard.css";

const PokeCard = (props) => {
    return (
        <>
            <div className="PokeCard">
                <Link to={'/edit-teammate/' + props.id}>
                    <button type="button">Edit/Delete</button>
                </Link>


                <Link to={'/details/' + props.id}>
                    <button type="button">View Details</button>
                </Link>
                <h2>{props.species}</h2>
                <h4>Nickname: {props.nickname}</h4>
                <p>Type: {props.type}</p>
                <p>Ability: {props.ability}</p>
                <p>Item: {props.item}</p>
            </div>
        </>
    );
};

export default PokeCard;