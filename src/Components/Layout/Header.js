import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const Header = ({branding}) => {
    return (
        
        <div>
            <nav className= "navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
                <div className="container">
                    <a href="/" className="navbar-brand">{branding}</a>
                </div>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a href="/" className="nav-link">Home</a>
                    </li>
                    
                </ul>
                <Link to="/contact/add">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a href="/" className="nav-link">Add</a>
                    </li>
                    
                </ul>
                </Link>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a href="/" className="nav-link">About</a>
                    </li>
                    
                </ul>
            </nav>
        </div>
    )
}




Header.propTypes = {
    branding: PropTypes.string.isRequired,
    
  };

export default Header
