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



    const initialForm = {

        title: "",

        price: "",

        location: "",

        description: "",

        imageUrl: ""

    };




    const [formData, setFormData] = useState(initialForm);



    const [submitting, setSubmitting] = useState(false);



    const [error, setError] = useState("");



    const [imageError, setImageError] = useState(false);









    useEffect(() => {


        if (editingProperty) {


            setFormData({

                title: editingProperty.title,

                price: editingProperty.price,

                location: editingProperty.location,

                description: editingProperty.description,

                imageUrl: editingProperty.imageUrl

            });


        } else {


            setFormData(initialForm);


        }



    }, [editingProperty]);









    const handleChange = (event) => {


        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });



        setError("");

    };









    const resetForm = () => {


        setFormData(initialForm);


        setImageError(false);


        setError("");


    };









    const validateForm = () => {


        const price = Number(formData.price);




        if (!formData.title.trim()) {


            return "Property title is required";


        }





        if (!price || price <= 0) {


            return "Price must be greater than zero";


        }





        if (!formData.location.trim()) {


            return "Location is required";


        }





        if (formData.description.trim().length < 20) {


            return "Description should contain at least 20 characters";


        }





        try {


            new URL(formData.imageUrl);



        } catch {


            return "Please enter a valid image URL";


        }





        return "";

    };









    const handleSubmit = async (event) => {


        event.preventDefault();




        const validationError = validateForm();




        if (validationError) {


            setError(validationError);


            return;


        }





        setSubmitting(true);


        setError("");







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



            setError(

                error.message ||

                "Failed to save property. Please try again."

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

                    ? "✏️ Edit Property"

                    : "🏠 Add New Property"

                }


            </h2>








            {
                error && (

                    <p className="form-error">

                        ❌ {error}

                    </p>

                )
            }









            <div className="form-group">


                <label>

                    Property Title

                </label>



                <input

                    type="text"

                    name="title"

                    placeholder="Enter property title"

                    value={formData.title}

                    onChange={handleChange}

                    required

                />


            </div>









            <div className="form-group">


                <label>

                    Price

                </label>



                <input

                    type="number"

                    name="price"

                    placeholder="Enter property price"

                    value={formData.price}

                    onChange={handleChange}

                    required

                />


            </div>









            <div className="form-group">


                <label>

                    Location

                </label>



                <input

                    type="text"

                    name="location"

                    placeholder="Enter property location"

                    value={formData.location}

                    onChange={handleChange}

                    required

                />


            </div>









            <div className="form-group">


                <label>

                    Description

                </label>



                <textarea

                    name="description"

                    placeholder="Describe the property"

                    value={formData.description}

                    onChange={handleChange}

                    required

                />



            </div>









            <div className="form-group">


                <label>

                    Image URL

                </label>



                <input

                    type="text"

                    name="imageUrl"

                    placeholder="Paste image URL"

                    value={formData.imageUrl}

                    onChange={(event) => {


                        handleChange(event);


                        setImageError(false);


                    }}

                    required

                />


            </div>









            {
    formData.imageUrl &&
    !imageError &&
    (() => {

        try {

            new URL(formData.imageUrl);

            return (

                <div className="image-preview">


                    <img

                        className="preview-image"

                        src={formData.imageUrl}

                        alt="Property preview"

                        onError={() =>
                            setImageError(true)
                        }

                    />


                </div>

            );


        } catch {


            return null;


        }


    })()
}









            {
                imageError && (

                    <p className="form-error">

                        ❌ Image preview unavailable

                    </p>

                )
            }









            <button

                type="submit"

                disabled={submitting}

            >


                {

                    submitting

                    ? editingProperty

                        ? "⏳ Updating Property..."

                        : "⏳ Adding Property..."

                    : editingProperty

                        ? "✓ Update Property"

                        : "＋ Add Property"

                }



            </button>






        </form>


    );


}



export default PropertyForm;