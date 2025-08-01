import { Outlet, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <div>
            <div className="header">
                <h4>Jump to: </h4>
                <nav className="navbar-layout">
                    <div><Link to="/">Home</Link></div>
                    <div><Link to="/view-team">View Team</Link></div>
                    <div><Link to="/add-teammate">Add Teammate</Link></div>
                </nav>
            </div>
            <Outlet />
        </div>

    );
}

export default Header;