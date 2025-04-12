import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Adoption.css";

const Adoption = () => {
    const [pets, setPets] = useState([]);
    const [activeMenu, setActiveMenu] = useState(null);

    const [newPet, setNewPet] = useState({
        name: "",
        gender: "",
        size: "",
        age: "",
        photo: null,
        photoPreview: null,
    });

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/pets");
                setPets(response.data);
            } catch (error) {
                console.error("Error fetching pets:", error);
            }
        };

        fetchPets();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "photo") {
            const file = files[0];
            setNewPet((prev) => ({
                ...prev,
                photo: file,
                photoPreview: URL.createObjectURL(file),
            }));
        } else {
            setNewPet((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", newPet.name);
        formData.append("gender", newPet.gender);
        formData.append("size", newPet.size);
        formData.append("age", newPet.age);
        formData.append("photo", newPet.photo);

        try {
            const response = await axios.post("http://localhost:3000/api/pets", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setPets((prevPets) => [response.data, ...prevPets]);

            setNewPet({
                name: "",
                gender: "",
                size: "",
                age: "",
                photo: null,
                photoPreview: null,
            });
        } catch (error) {
            console.error("Error adding pet:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/pets/${id}`);
            setPets((prevPets) => prevPets.filter((pet) => pet._id !== id));
            setActiveMenu(null);
        } catch (error) {
            console.error("Error deleting pet:", error);
        }
    };

    const handleMenuToggle = (id) => {
        setActiveMenu((prev) => (prev === id ? null : id));
    };

    const handleEdit = (id) => {
        console.log("Edit pet with id:", id);
        setActiveMenu(null);
        // Future: Prefill edit form + submit as PUT request
    };

    return (
        <div className="adoption-page">
            <div className="adoption-container">
                {/* Sidebar */}
                <div className="sidebar">
                    <h2>PetVerse</h2>
                    <ul>
                        <li>Home</li>
                        <li>Profile</li>
                        <li>MarketPlace</li>
                        <li>Rescue</li>
                        <li>CheckOut</li>
                        <li>LogOut</li>
                    </ul>

                    <div className="adoption-form">
                        <h3>Looking to Rehome Your Furry Friend?</h3>

                        <label htmlFor="petName">Pet Name:</label>
                        <input
                            type="text"
                            id="petName"
                            name="name"
                            value={newPet.name}
                            onChange={handleChange}
                        />

                        <label htmlFor="petGender">Pet Gender:</label>
                        <input
                            type="text"
                            id="petGender"
                            name="gender"
                            value={newPet.gender}
                            onChange={handleChange}
                        />

                        <label htmlFor="petSize">Pet Size:</label>
                        <input
                            type="text"
                            id="petSize"
                            name="size"
                            value={newPet.size}
                            onChange={handleChange}
                        />

                        <label htmlFor="petAge">Pet Age:</label>
                        <input
                            type="text"
                            id="petAge"
                            name="age"
                            value={newPet.age}
                            onChange={handleChange}
                        />

                        <label htmlFor="petPhoto">Photo:</label>
                        <input
                            type="file"
                            id="petPhoto"
                            name="photo"
                            onChange={handleChange}
                        />

                        <button onClick={handleSubmit}>Offer for Adoption</button>
                    </div>
                </div>

                {/* Main Section */}
                <div className="main-section">
                    <div className="hero-image">
                        <div className="hero-text">
                            <h1>Find Your New Best Friend</h1>
                            <p>Adopt a loving pet today</p>
                        </div>
                    </div>

                    <div className="main-feed">
                        <h2>Available Pets</h2>
                        {pets.length > 0 ? (
                            pets.map((pet) => (
                                <div className="pet-card" key={pet._id}>
                                    <div className="pet-image-container">
                                        {pet.photoUrl && (
                                            <img
                                                src={`http://localhost:3000/${pet.photoUrl}`}
                                                alt="Pet"
                                            />
                                        )}

                                        <div className="three-dots">
                                            <button onClick={() => handleMenuToggle(pet._id)}>
                                                ⋮
                                            </button>
                                            {activeMenu === pet._id && (
                                                <div className="dropdown-menu">
                                                    <button onClick={() => handleEdit(pet._id)}>
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(pet._id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <h3>{pet.name}</h3>
                                    <p>
                                        <strong>Gender:</strong> {pet.gender}
                                    </p>
                                    <p>
                                        <strong>Size:</strong> {pet.size}
                                    </p>
                                    <p>
                                        <strong>Age:</strong> {pet.age}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No pets available for adoption at the moment.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Adoption;
