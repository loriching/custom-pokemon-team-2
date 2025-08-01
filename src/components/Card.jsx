import "./PokeCard.css";

const Card = (props) => {
    return (
        <>
            <div className="PokeCard">
                <h2>{props.species}</h2>
                <h4>Nickname: {props.nickname}</h4>
                <p>Type: {props.type}</p>
                <p>Ability: {props.ability}</p>
                <p>Item: {props.item}</p>
            </div>
        </>
    );
};

export default Card;