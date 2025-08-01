import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import ViewTeam from "./components/ViewTeam";
import AddTeammate from "./components/AddTeammate";
import EditTeammate from "./components/EditTeammate";
import Details from "./components/Details";

const NoMatch = () => {
    return (
        <>
            <h3>Sorry, that page doesn't exist!</h3>
            <p>Click below to return to the home page.</p>
            <Link to="/">Home</Link>
        </>
    )
}

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Header />}>
                        <Route index={true} element={<Home />} />
                        <Route path="/view-team" element={<ViewTeam />} />
                        <Route path="/add-teammate" element={<AddTeammate />} />
                        <Route path="/edit-teammate/:id" element={<EditTeammate />} />
                        <Route path="/details/:id" element={<Details />} />
                    </Route>
                    <Route path="*" element={<NoMatch />}/>
                </Routes>
            </BrowserRouter>
        </>
    );

};

export default App;