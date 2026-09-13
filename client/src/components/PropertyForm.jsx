import { useEffect, useState } from "react";
import {
    createProperty,
    updateProperty
} from "../services/propertyService";


function PropertyForm({
    onPropertyCreated,
    editingProperty,
    onPropertyUpdated
}) {


    const [formData, setFormData] = useState({

        title: "",
        price: "",
        location: "",
        description: "",
        imageUrl: ""

    });



    const [submitting, setSubmitting] = useState(false);





    useEffect(() => {


        if (editingProperty) {


            setFormData({

                title: editingProperty.title,

                price: editingProperty.price,

                location: editingProperty.location,

                description: editingProperty.description,

                imageUrl: editingProperty.imageUrl

            });


        }


    }, [editingProperty]);







    const handleChange = (event) => {


        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });


    };







    const resetForm = () => {


        setFormData({

            title: "",

            price: "",

            location: "",

            description: "",

            imageUrl: ""

        });


    };








    const handleSubmit = async (event) => {


        event.preventDefault();


        setSubmitting(true);



        try {



            const propertyData = {


                ...formData,


                price: Number(formData.price)


            };






            if (editingProperty) {


                await updateProperty(

                    editingProperty._id,

                    propertyData

                );



                onPropertyUpdated();



            } else {



                await createProperty(propertyData);



                onPropertyCreated();



            }





            resetForm();




        } catch (error) {


            console.error(

                "Failed to save property:",

                error

            );



        } finally {


            setSubmitting(false);


        }


    };







    return (


        <form

            className="property-form"

            onSubmit={handleSubmit}

        >




            <h2>

                {
                    editingProperty

                    ? "Edit Property"

                    : "Add New Property"
                }

            </h2>







            <input

                type="text"

                name="title"

                placeholder="Property title"

                value={formData.title}

                onChange={handleChange}

                required

            />







            <input

                type="number"

                name="price"

                placeholder="Price"

                value={formData.price}

                onChange={handleChange}

                required

            />







            <input

                type="text"

                name="location"

                placeholder="Location"

                value={formData.location}

                onChange={handleChange}

                required

            />







            <textarea

                name="description"

                placeholder="Description"

                value={formData.description}

                onChange={handleChange}

                required

            />







            <input

                type="url"

                name="imageUrl"

                placeholder="Image URL"

                value={formData.imageUrl}

                onChange={handleChange}

                required

            />








            <button

                type="submit"

                disabled={submitting}

            >

                {

                    submitting

                    ? "Saving..."

                    :

                    editingProperty

                    ? "Update Property"

                    : "Add Property"

                }


            </button>





        </form>


    );


}


export default PropertyForm;