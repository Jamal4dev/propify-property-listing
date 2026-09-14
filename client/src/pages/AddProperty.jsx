import { useNavigate } from "react-router-dom";
import PropertyForm from "../components/PropertyForm";


function AddProperty() {


    const navigate = useNavigate();



    const handlePropertyCreated = () => {

        navigate("/");

    };



    return (

        <main className="home-page">


            <div className="page-intro">
                <p className="eyebrow">Share a space</p>
                <h1 className="page-title">Add a new property</h1>
                <p>Give future residents a clear, honest first look at what makes this place special.</p>
            </div>



            <PropertyForm

                onPropertyCreated={handlePropertyCreated}

            />


        </main>

    );

}


export default AddProperty;