import React, { useState, useEffect } from "react";
import axios from "axios";

const CarRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [currentRental, setCurrentRental] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/rentals");
      setRentals(response.data);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRental({ ...currentRental, [name]: value });
  };

  const handleAddRental = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/rentals", currentRental);
      fetchRentals();
      setCurrentRental({ title: "", description: "", price: "", imageUrl: "" });
    } catch (error) {
      console.error("Error adding rental:", error);
    }
  };

  const handleEditRental = (rental) => {
    setCurrentRental(rental);
    setEditing(true);
  };

  const handleUpdateRental = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/rentals/${currentRental._id}`,
        currentRental
      );
      fetchRentals();
      setCurrentRental({ title: "", description: "", price: "", imageUrl: "" });
      setEditing(false);
    } catch (error) {
      console.error("Error updating rental:", error);
    }
  };

  const handleDeleteRental = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/rentals/${id}`);
      fetchRentals();
    } catch (error) {
      console.error("Error deleting rental:", error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Car Rentals</h1>

      <div className="row">
        <div className="col-md-6">
          <form onSubmit={editing ? handleUpdateRental : handleAddRental}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={currentRental.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                value={currentRental.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={currentRental.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                className="form-control"
                value={currentRental.imageUrl}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editing ? "Update Rental" : "Add Rental"}
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setEditing(false);
                  setCurrentRental({
                    title: "",
                    description: "",
                    price: "",
                    imageUrl: "",
                  });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="col-md-6">
          <h2 className="mb-4">Available Car Rentals</h2>
          {rentals.length === 0 ? (
            <p>No car rentals available.</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((rental) => (
                  <tr key={rental._id}>
                    <td>
                      <img
                        src={rental.imageUrl}
                        alt={rental.title}
                        style={{ width: "100px", height: "auto" }}
                      />
                    </td>
                    <td>{rental.title}</td>
                    <td>{rental.description}</td>
                    <td>${rental.price}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleEditRental(rental)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteRental(rental._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarRentals;
