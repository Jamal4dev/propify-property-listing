import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PropertyForm from "../components/PropertyForm";
import Toast from "../components/Toast";

import { getProperty } from "../services/propertyService";



function EditProperty() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [property, setProperty] = useState(null);


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


            }


        };



        fetchProperty();



    }, [id]);








    const handlePropertyUpdated = () => {


        showToast(
            "Property updated successfully",
            "success"
        );



        setTimeout(() => {


            navigate(`/property/${id}`);


        }, 1000);



    };









    if (!property) {


        return <h2>Loading property...</h2>;


    }








    return (


        <main className="home-page">



            <Toast

                message={toast.message}

                type={toast.type}

            />






            <h1 className="page-title">

                Edit Property

            </h1>






            <PropertyForm


                editingProperty={property}


                onPropertyUpdated={handlePropertyUpdated}



            />





        </main>


    );


}


export default EditProperty;