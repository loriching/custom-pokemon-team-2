import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <>
            <h1>Build Your Own Pokémon Team!</h1>
            <h3>This website allows you to build a custom Pokémon team by adding, customizing, or deleting team members.</h3>
            <h3>Click the buttons below to get started!</h3>

            <br></br>

            <div className="buttons">
                <Link to="/view-team">
                    <button type="button">
                        View Team
                    </button>
                </Link>

                <br></br>

                <Link to="/add-teammate">
                    <button type="button">
                        Add Pokémon
                    </button>
                </Link>
            </div>
            
        </>
    );
};

export default Home;