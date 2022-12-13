import React from 'react';
import {Link} from "react-router-dom";
import '../../App.css';

const Navbar = () => {
  return (
    <div className="container-fluid">
      <Link className="navbar-brand" to='/'>Трекер калорий</Link>
    </div>
  );
};

export default Navbar;