import { useEffect, useState } from "react";

import {
    getProperties,
    deleteProperty
} from "../services/propertyService";


import PropertyCard from "../components/PropertyCard";
import PropertyForm from "../components/PropertyForm";
import Loading from "../components/Loading";
import Toast from "../components/Toast";
import SearchFilter from "../components/SearchFilter";



function Home() {


    const [properties, setProperties] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");



    const [toast, setToast] = useState({

        message: "",

        type: ""

    });





    const showToast = (message, type) => {


        setToast({

            message,

            type

        });



        setTimeout(() => {


            setToast({

                message: "",

                type: ""

            });


        }, 3000);


    };








    const fetchProperties = async (filters = {}) => {


        try {


            setLoading(true);

            setError("");



            const data = await getProperties(filters);



            setProperties(data);



        } catch (error) {


            console.error(
                "Failed to fetch properties:",
                error
            );



            setError(

                error.message ||

                "Unable to load properties. Please try again."

            );



        } finally {


            setLoading(false);


        }


    };









    useEffect(() => {


        fetchProperties();


    }, []);









    const handleFilter = (filters) => {


        fetchProperties(filters);


    };









    const handlePropertyCreated = () => {


        fetchProperties();



        showToast(

            "Property added successfully",

            "success"

        );


    };









    const handleDelete = async (id) => {


        try {


            await deleteProperty(id);



            await fetchProperties();



            showToast(

                "Property deleted successfully",

                "success"

            );



        } catch (error) {


            console.error(

                "Failed to delete property:",

                error

            );



            showToast(

                error.message ||

                "Failed to delete property",

                "error"

            );


        }


    };









    if (loading) {


        return <Loading />;


    }









    if (error) {


        return (

            <main className="home-page">


                <div className="error-message">


                    <p>

                        {error}

                    </p>





                    <button

                        onClick={() => fetchProperties()}

                    >

                        Try Again

                    </button>



                </div>


            </main>


        );


    }









    return (


        <main className="home-page">



            <Toast

                message={toast.message}

                type={toast.type}

            />







            <h1 className="page-title">

                Propify Properties

            </h1>








            <PropertyForm

                onPropertyCreated={

                    handlePropertyCreated

                }

            />








            <SearchFilter

                onFilter={handleFilter}

            />









            {

                properties.length === 0 ? (



                    <div className="empty-state">


                        <h2>

                            No properties found

                        </h2>



                        <p>

                            Try adjusting your search filters.

                        </p>



                    </div>



                ) : (



                    <section className="property-grid">


                        {

                            properties.map((property) => (



                                <PropertyCard


                                    key={property._id}


                                    property={property}


                                    onDelete={handleDelete}


                                />



                            ))

                        }



                    </section>



                )

            }






        </main>


    );


}



export default Home;