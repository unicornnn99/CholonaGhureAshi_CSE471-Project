import React, { useState, useEffect } from "react";
import axios from "axios";

const TravelPartners = () => {
  const [partners, setPartners] = useState([]);
  const [currentPartner, setCurrentPartner] = useState({
    name: "",
    company: "",
    contact: "",
    logoUrl: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/partners");
      setPartners(response.data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPartner({ ...currentPartner, [name]: value });
  };

  const handleAddPartner = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/partners", currentPartner);
      fetchPartners();
      setCurrentPartner({ name: "", company: "", contact: "", logoUrl: "" });
    } catch (error) {
      console.error("Error adding partner:", error);
    }
  };

  const handleEditPartner = (partner) => {
    setCurrentPartner(partner);
    setEditing(true);
  };

  const handleUpdatePartner = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/partners/${currentPartner._id}`,
        currentPartner
      );
      fetchPartners();
      setCurrentPartner({ name: "", company: "", contact: "", logoUrl: "" });
      setEditing(false);
    } catch (error) {
      console.error("Error updating partner:", error);
    }
  };

  const handleDeletePartner = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/partners/${id}`);
      fetchPartners();
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Travel Partners</h1>

      <div className="row">
        <div className="col-md-6">
          <form onSubmit={editing ? handleUpdatePartner : handleAddPartner}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={currentPartner.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Company</label>
              <input
                type="text"
                name="company"
                className="form-control"
                value={currentPartner.company}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input
                type="text"
                name="contact"
                className="form-control"
                value={currentPartner.contact}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Logo URL</label>
              <input
                type="text"
                name="logoUrl"
                className="form-control"
                value={currentPartner.logoUrl}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editing ? "Update Partner" : "Add Partner"}
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setEditing(false);
                  setCurrentPartner({
                    name: "",
                    company: "",
                    contact: "",
                    logoUrl: "",
                  });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="col-md-6">
          <h2 className="mb-4">Available Travel Partners</h2>
          {partners.length === 0 ? (
            <p>No travel partners available.</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => (
                  <tr key={partner._id}>
                    <td>
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        style={{ width: "100px", height: "auto" }}
                      />
                    </td>
                    <td>{partner.name}</td>
                    <td>{partner.company}</td>
                    <td>{partner.contact}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleEditPartner(partner)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeletePartner(partner._id)}
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

export default TravelPartners;
