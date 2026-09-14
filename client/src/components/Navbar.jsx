import { useState } from "react";
import { NavLink } from "react-router-dom";


function Navbar() {


    const [menuOpen, setMenuOpen] = useState(false);




    const closeMenu = () => {

        setMenuOpen(false);

    };





    return (


        <nav className="navbar" aria-label="Primary navigation">



            <div className="navbar-brand">


                <NavLink to="/" className="brand-link" aria-label="Propify home">
                    <span className="brand-mark" aria-hidden="true">P</span>
                    <span>Propify</span>
                </NavLink>


            </div>






            <button

                className="menu-toggle"

                type="button"

                aria-expanded={menuOpen}

                aria-controls="primary-navigation"

                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}

                onClick={() =>
                    setMenuOpen(!menuOpen)
                }

            >

                <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>


            </button>







            <div

                id="primary-navigation"

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