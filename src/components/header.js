import React from 'react';
import { Link } from 'react-router-dom';

import '../css/header.css';

const Header = () => {

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">

            <Link to={'/'} className="navbar-brand abs">Personal Control</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse" id="collapsingNavbar">

                <ul className="navbar-nav">

                    <li className="nav-item active">
                        <Link to={'/lancamentos'} className="nav-link">Lançamentos</Link>
                    </li>

                </ul>

                <ul className="navbar-nav ml-auto">

                    <li className="nav-item">
                        <Link to={'/profile'} className="nav-link" data-target="#myModal" data-toggle="modal">Mario Marques</Link>
                    </li>

                </ul>
            </div>
        </nav>
    );

};

export default Header;