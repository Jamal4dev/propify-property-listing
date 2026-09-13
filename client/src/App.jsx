import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddProperty from "./pages/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";
import EditProperty from "./pages/EditProperty";



function App() {


    return (

        <BrowserRouter>


            <Navbar />


            <Routes>


                <Route

                    path="/"

                    element={<Home />}

                />



                <Route

                    path="/add-property"

                    element={<AddProperty />}

                />



                <Route

                    path="/property/:id"

                    element={<PropertyDetails />}

                />



                <Route

                    path="/property/:id/edit"

                    element={<EditProperty />}

                />


            </Routes>


        </BrowserRouter>

    );

}


export default App;