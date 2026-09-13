import { Link, useNavigate } from "react-router-dom";


function PropertyCard({
    property,
    onDelete
}) {


    const navigate = useNavigate();




    const handleDelete = () => {


        const confirmDelete = window.confirm(
            "Are you sure you want to delete this property?"
        );



        if (!confirmDelete) {

            return;

        }



        onDelete(property._id);


    };





    const shortDescription = property.description.length > 120

        ? `${property.description.substring(0, 120)}...`

        : property.description;







    return (


        <article className="property-card">





            <div className="property-image-wrapper">


                <img

                    className="property-image"

                    src={property.imageUrl}

                    alt={property.title}

                    onError={(event) => {

                        event.target.src =
                            "https://via.placeholder.com/600x400?text=No+Image";

                    }}

                />


            </div>







            <div className="property-content">





                <h2 className="property-title">

                    {property.title}

                </h2>







                <div className="property-meta">



                    <p className="property-price">

                        ₦{Number(property.price).toLocaleString()}

                    </p>





                    <p className="property-location">

                        📍 {property.location}

                    </p>



                </div>








                <p className="property-description">

                    {shortDescription}

                </p>








                <div className="property-actions">





                    <Link

                        to={`/property/${property._id}`}

                        className="view-details-btn"

                    >

                        View Details

                    </Link>








                    <button

                        className="edit-btn"

                        onClick={() =>

                            navigate(
                                `/property/${property._id}/edit`
                            )

                        }

                        aria-label="Edit property"

                    >

                        Edit

                    </button>








                    <button

                        className="delete-btn"

                        onClick={handleDelete}

                        aria-label="Delete property"

                    >

                        Delete

                    </button>





                </div>





            </div>





        </article>


    );


}


export default PropertyCard;