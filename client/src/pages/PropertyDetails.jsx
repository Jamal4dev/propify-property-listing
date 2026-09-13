import { useEffect, useState } from "react";
import {
    useParams,
    Link,
    useNavigate
} from "react-router-dom";

import {
    getProperty,
    deleteProperty
} from "../services/propertyService";



function PropertyDetails() {


    const { id } = useParams();

    const navigate = useNavigate();



    const [property, setProperty] = useState(null);

    const [loading, setLoading] = useState(true);





    useEffect(() => {


        const fetchProperty = async () => {


            try {


                const data = await getProperty(id);

                setProperty(data);



            } catch (error) {


                console.error(
                    "Failed to fetch property:",
                    error
                );


            } finally {


                setLoading(false);


            }


        };



        fetchProperty();



    }, [id]);






    const handleDelete = async () => {


        const confirmDelete = window.confirm(
            "Are you sure you want to delete this property?"
        );



        if (!confirmDelete) {

            return;

        }



        try {


            await deleteProperty(id);



            alert(
                "Property deleted successfully"
            );



            navigate("/");



        } catch (error) {


            console.error(
                "Failed to delete property:",
                error
            );


            alert(
                "Failed to delete property"
            );


        }


    };






    if (loading) {


        return (

            <div className="loading">

                Loading property...

            </div>

        );


    }






    if (!property) {


        return (

            <div className="loading">

                Property not found.

            </div>

        );


    }






    return (


        <main className="property-details-page">



            <Link

                to="/"

                className="back-btn"

            >

                ← Back to Properties

            </Link>






            <section className="property-details-card">





                <img

                    src={property.imageUrl}

                    alt={property.title}

                    className="details-image"

                />






                <div className="details-content">





                    <h1>

                        {property.title}

                    </h1>






                    <h2 className="details-price">

                        ₦{property.price.toLocaleString()}

                    </h2>







                    <p className="details-location">

                        📍 {property.location}

                    </p>







                    <p className="details-description">

                        {property.description}

                    </p>








                    <div className="details-actions">





                        <Link

                            to={`/property/${property._id}/edit`}

                            className="edit-btn"

                        >

                            Edit Property

                        </Link>







                        <button

                            className="delete-btn"

                            onClick={handleDelete}

                        >

                            Delete Property

                        </button>





                    </div>





                </div>





            </section>





        </main>


    );


}


export default PropertyDetails;