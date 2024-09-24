import React, { useState, useEffect } from "react";
import axios from "axios";

const HolidayPackage = () => {
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [editPackageId, setEditPackageId] = useState(null);

  // Fetch packages on load
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/packages");
        setPackages(res.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  // Handle adding a new package
  const handleAddPackage = async () => {
    try {
      await axios.post("http://localhost:8080/api/packages", newPackage);
      setNewPackage({ title: "", description: "", price: "", imageUrl: "" });
      fetchPackages(); // Refresh the package list
      window.alert("Package added successfully!");
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  // Handle updating a package
  const handleUpdatePackage = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/packages/${editPackageId}`,
        newPackage
      );
      setEditPackageId(null);
      setNewPackage({ title: "", description: "", price: "", imageUrl: "" });
      fetchPackages(); // Refresh the package list
      window.alert("Package Updated successfully!");
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  // Handle deleting a package
  const handleDeletePackage = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/packages/${id}`);
      fetchPackages(); // Refresh the package list
      window.alert("Package Deleted successfully!");
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  // Fetch the list of packages
  const fetchPackages = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/packages");
      setPackages(res.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Holiday Packages Management</h1>

      <div className="row mb-5">
        <div className="col-md-8 mx-auto">
          <div className="card p-4">
            <h3 className="mb-3 text-center">
              {editPackageId ? "Edit Package" : "Add New Package"}
            </h3>
            <form
              onSubmit={editPackageId ? handleUpdatePackage : handleAddPackage}
            >
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={newPackage.title}
                  onChange={(e) =>
                    setNewPackage({ ...newPackage, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newPackage.description}
                  onChange={(e) =>
                    setNewPackage({
                      ...newPackage,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={newPackage.price}
                  onChange={(e) =>
                    setNewPackage({ ...newPackage, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image URL"
                  value={newPackage.imageUrl}
                  onChange={(e) =>
                    setNewPackage({ ...newPackage, imageUrl: e.target.value })
                  }
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {editPackageId ? "Update Package" : "Add Package"}
              </button>
              {editPackageId && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setNewPackage({
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
        </div>
      </div>

      <div className="row">
        {packages.length > 0 ? (
          <div className="col-md-12">
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
                {packages.map((pkg) => (
                  <tr key={pkg._id}>
                    <td>
                      <img
                        src={pkg.imageUrl}
                        alt={pkg.title}
                        style={{ width: "100px", height: "auto" }}
                      />
                    </td>
                    <td>{pkg.title}</td>
                    <td>{pkg.description}</td>
                    <td>
                      <strong>${pkg.price}</strong>
                    </td>
                    <td>
                      <div className="d-flex">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setEditPackageId(pkg._id);
                            setNewPackage({
                              title: pkg.title,
                              description: pkg.description,
                              price: pkg.price,
                              imageUrl: pkg.imageUrl,
                            });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeletePackage(pkg._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="col-md-12">
            <p className="text-center">No packages available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HolidayPackage;
