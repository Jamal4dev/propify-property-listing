import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { getProperties, deleteProperty } from "../services/propertyService";

import PropertyCard from "../components/PropertyCard";
import SearchFilter from "../components/SearchFilter";
import Loading from "../components/Loading";


function Home() {


    const [properties, setProperties] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const latestRequestId = useRef(0);



    const fetchProperties = async (filters = {}) => {
        const requestId = ++latestRequestId.current;


            try {
                setLoading(true);
                setError("");
                const data = await getProperties(filters);

                if (requestId === latestRequestId.current) {
                    setProperties(data || []);
                }


            } catch (error) {


                console.error(
                    "Failed to fetch properties:",
                    error
                );


                if (requestId === latestRequestId.current) {
                    setProperties([]);
                    setError(error.response?.data?.message || "Unable to load properties.");
                }


            } finally {


                if (requestId === latestRequestId.current) {
                    setLoading(false);
                }


            }


        };

    useEffect(() => {
        const loadProperties = async () => {
            await fetchProperties();
        };

        void loadProperties();
    }, []);







    const handleDelete = async (id) => {


        try {


            await deleteProperty(id);



            setProperties((currentProperties) =>


                currentProperties.filter(

                    (property) =>

                        property._id !== id

                )


            );



        } catch (error) {


            console.error(

                "Failed to delete property:",

                error

            );
            setError(error.response?.data?.message || "Unable to delete property.");


        }


    };








    if (loading) {


        return <Loading />;


    }







    return (


        <main className="home-page">


            <section className="hero">

                <div className="hero-copy">
                    <p className="eyebrow">A better way to find your next address</p>
                    <h1>Find a place that feels like <em>home.</em></h1>
                    <p className="hero-description">
                        Explore thoughtful property listings in locations you will love, all in one calm, simple marketplace.
                    </p>
                    <div className="hero-actions">
                        <a href="#properties" className="button button-primary">
                            Explore properties <span aria-hidden="true">↘</span>
                        </a>
                        <Link to="/add-property" className="button button-quiet">List a property</Link>
                    </div>
                </div>

                <div className="hero-aside" aria-label="Propify marketplace highlights">
                    <div className="hero-image-frame">
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85" alt="Modern home exterior with warm evening light" />
                        <span className="hero-image-label">Curated spaces<br /><strong>for real life</strong></span>
                    </div>
                    <div className="hero-stat"><strong>01</strong><span>Search homes<br />with intention</span></div>
                </div>


            </section>







            <section className="properties-section" id="properties">


                <div className="section-heading">
                    <div>
                        <p className="eyebrow">The latest listings</p>
                        <h2>Find your next chapter</h2>
                    </div>
                    <p className="section-note">Browse homes added by the Propify community.</p>
                </div>

                <SearchFilter onFilter={fetchProperties} />

                {error && <p className="error-message">{error}</p>}






                {

                    properties.length === 0 ? (


                        <p className="empty-message">

                            No properties available.

                        </p>


                    ) : (



                        <div className="property-grid">


                            {

                                properties.map((property) => (


                                    <PropertyCard


                                        key={
                                            property._id
                                        }


                                        property={
                                            property
                                        }


                                        onDelete={
                                            handleDelete
                                        }


                                    />


                                ))


                            }



                        </div>


                    )


                }





            </section>





        </main>


    );


}


export default Home;