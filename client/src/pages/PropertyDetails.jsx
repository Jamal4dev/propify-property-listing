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


import Loading from "../components/Loading";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";




function PropertyDetails() {


    const { id } = useParams();

    const navigate = useNavigate();




    const [property, setProperty] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [imageError, setImageError] = useState(false);


    const [showModal, setShowModal] = useState(false);




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









    const fetchProperty = async () => {


        try {


            setLoading(true);

            setError("");



            const data = await getProperty(id);


            setProperty(data);



        } catch (error) {


            console.error(

                "Failed to fetch property:",

                error

            );


            setError(

                "Unable to load property details."

            );



        } finally {


            setLoading(false);


        }


    };









    useEffect(() => {


        fetchProperty();



    }, [id]);









    const handleDelete = () => {


        setShowModal(true);


    };









    const confirmDelete = async () => {


        try {


            await deleteProperty(id);



            setShowModal(false);



            showToast(

                "Property deleted successfully",

                "success"

            );





            setTimeout(() => {


                navigate("/");


            }, 1000);





        } catch (error) {


            console.error(

                "Failed to delete property:",

                error

            );



            setShowModal(false);



            showToast(

                "Failed to delete property",

                "error"

            );


        }


    };









    const cancelDelete = () => {


        setShowModal(false);


    };









    if (loading) {


        return <Loading />;


    }









    if (error) {


        return (


            <main className="property-details-page">


                <Toast

                    message={toast.message}

                    type={toast.type}

                />



                <div className="error-message">


                    <p>

                        {error}

                    </p>




                    <button

                        onClick={fetchProperty}

                    >

                        Try Again

                    </button>



                </div>


            </main>


        );


    }









    if (!property) {


        return (


            <main className="property-details-page">


                <div className="empty-state">


                    <h2>

                        Property not found

                    </h2>



                    <Link

                        to="/"

                        className="view-details-btn"

                    >

                        Return Home

                    </Link>


                </div>


            </main>


        );


    }









    return (


        <main className="property-details-page">



            <Toast

                message={toast.message}

                type={toast.type}

            />









            <Link

                to="/"

                className="back-btn"

            >

                ← Back to Properties

            </Link>









            <section className="property-details-card">





                {
                    !imageError ? (


                        <img

                            src={property.imageUrl}

                            alt={property.title}

                            className="details-image"

                            onError={() =>

                                setImageError(true)

                            }

                        />


                    ) : (


                        <div className="empty-state">


                            <h2>

                                Image unavailable

                            </h2>


                        </div>


                    )

                }









                <div className="details-content">





                    <h1>

                        {property.title}

                    </h1>









                    <h2 className="details-price">

                        ₦
                        {
                            Number(property.price)

                                .toLocaleString()

                        }

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









            {
                showModal && (


                    <ConfirmModal


                        title="Delete Property?"


                        message="Are you sure you want to permanently delete this property?"


                        confirmText="Delete"


                        cancelText="Cancel"


                        onConfirm={confirmDelete}


                        onCancel={cancelDelete}


                    />


                )
            }






        </main>


    );


}



export default PropertyDetails;