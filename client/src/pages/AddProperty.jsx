import { useNavigate } from "react-router-dom";
import PropertyForm from "../components/PropertyForm";


function AddProperty() {


    const navigate = useNavigate();



    const handlePropertyCreated = () => {

        navigate("/");

    };



    return (

        <main className="home-page">


            <h1 className="page-title">
                Add New Property
            </h1>



            <PropertyForm

                onPropertyCreated={handlePropertyCreated}

            />


        </main>

    );

}


export default AddProperty;