import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropertyForm from "../components/PropertyForm";
import Toast from "../components/Toast";
import { getProperty } from "../services/propertyService";

function EditProperty() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [error, setError] = useState("");
    const [toast, setToast] = useState({ message: "", type: "" });

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
    };

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await getProperty(id);
                setProperty(data);
            } catch (requestError) {
                console.error("Failed to fetch property:", requestError);
                setError(requestError.response?.data?.message ||
                    "Unable to load property for editing.");
            }
        };

        void fetchProperty();
    }, [id]);

    const handlePropertyUpdated = () => {
        showToast("Property updated successfully", "success");
        setTimeout(() => navigate(`/property/${id}`), 1000);
    };

    if (!property) {
        return (
            <main className="home-page">
                <div className="empty-state">
                    <h2>{error || "Loading property..."}</h2>
                    {error && (
                        <button onClick={() => window.location.reload()}>
                            Try Again
                        </button>
                    )}
                </div>
            </main>
        );
    }

    return (
        <main className="home-page">
            <Toast message={toast.message} type={toast.type} />
            <div className="page-intro">
                <p className="eyebrow">Keep it current</p>
                <h1 className="page-title">Edit property details</h1>
                <p>Make a thoughtful update so your listing stays useful and accurate.</p>
            </div>
            <PropertyForm
                key={property._id}
                editingProperty={property}
                onPropertyUpdated={handlePropertyUpdated}
            />
        </main>
    );
}

export default EditProperty;
