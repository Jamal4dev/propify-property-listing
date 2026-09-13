import { useState } from "react";
import { NavLink } from "react-router-dom";


function Navbar() {


    const [menuOpen, setMenuOpen] = useState(false);




    const closeMenu = () => {

        setMenuOpen(false);

    };





    return (


        <nav className="navbar">



            <div className="navbar-brand">


                <NavLink to="/">

                    Propify

                </NavLink>


            </div>






            <button

                className="menu-toggle"

                onClick={() =>
                    setMenuOpen(!menuOpen)
                }

            >

                {menuOpen ? "✕" : "☰"}


            </button>







            <div

                className={
                    menuOpen
                    ? "navbar-links open"
                    : "navbar-links"
                }

            >



                <NavLink

                    to="/"

                    onClick={closeMenu}

                    className={({ isActive }) =>

                        isActive
                        ? "active-link"
                        : ""

                    }

                >

                    Home

                </NavLink>







                <NavLink

                    to="/add-property"

                    onClick={closeMenu}

                    className={({ isActive }) =>

                        isActive
                        ? "active-link"
                        : ""

                    }

                >

                    Add Property

                </NavLink>





            </div>



        </nav>


    );


}


export default Navbar;