import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import tripRoute from './Routes/createTrip.js';
import viewtripRoute from './Routes/showTrip.js';
import locationRoute from './Routes/showLocations.js';
import hotelRoute from './Routes/showHotels.js';


const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "500mb" })); // Set the body parser limit
app.use(express.urlencoded({ limit: "500mb", extended: true }));

const uri = `mongodb+srv://nazninnafisa99:pass1234@unicorn.cljhf.mongodb.net/Trippy?retryWrites=true&w=majority&appName=Unicorn`;
mongoose
  .connect(uri)
  .then (()=> {
    console.log('App connected to database');
  })
  .catch((err) =>{
    console.log(err);
    process.exit(1);
  })

//Create a MongoClient with a MongoClientOptions object to set the Stable API ver

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});


async function run() {
	try {
		let holidayPackagesCollection;
    holidayPackagesCollection = client.db("demoDB").collection("packages");
    // Get all holiday packages
    app.get("/api/packages", async (req, res) => {
      const packages = await holidayPackagesCollection.find({}).toArray();
      res.send(packages);
    });

    // Add new holiday package
    app.post("/api/packages", async (req, res) => {
      const newPackage = req.body;
      try {
        await holidayPackagesCollection.insertOne(newPackage);
        res.status(200).json({ message: "Package added successfully" });
      } catch (err) {
        res.status(500).json({ error: "Failed to add package" });
      }
    });

    // Update a package
    app.put("/api/packages/:id", async (req, res) => {
      const { id } = req.params;
      const { title, description, price, imageUrl } = req.body;
      try {
        await holidayPackagesCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, description, price, imageUrl } }
          );
        res.send("Package updated updated successfully");
      } catch (error) {
        console.error("Error updating rental:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // Delete a package
    app.delete("/api/packages/:id", async (req, res) => {
      const { id } = req.params;
      try {
        await holidayPackagesCollection.deleteOne({ _id: new ObjectId(id) });
        res.send("Package deleted successfully");
      } catch (error) {
        console.error("Error deleting rental:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    let rentalCollection;
    rentalCollection = client.db("demoDB").collection("carRentals");
    // GET all car rentals
    app.get("/api/rentals", async (req, res) => {
      try {
        const rentals = await rentalCollection.find({}).toArray();
        res.json(rentals);
      } catch (error) {
        console.error("Error fetching rentals:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // POST a new car rental
    app.post("/api/rentals", async (req, res) => {
      const newRental = req.body;
      try {
        await rentalCollection.insertOne(newRental);
        res.status(200).json({ message: "Car rental added successfully" });
      } catch (err) {
        res.status(500).json({ error: "Failed to add rental" });
      }
    });

    // PUT to update a car rental
    app.put("/api/rentals/:id", async (req, res) => {
      const { id } = req.params;
      const { title, description, price, imageUrl } = req.body;
      try {
        await rentalCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, description, price, imageUrl } }
          );
        res.send("Car rental updated successfully");
      } catch (error) {
        console.error("Error updating rental:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // DELETE a car rental
    app.delete("/api/rentals/:id", async (req, res) => {
      const { id } = req.params;
      try {
        await rentalCollection.deleteOne({ _id: new ObjectId(id) });
        res.send("Car rental deleted successfully");
      } catch (error) {
        console.error("Error deleting rental:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    let PartnerCollection;
    PartnerCollection = client.db("demoDB").collection("travelPartners");
    // GET all travel partners
    app.get("/api/partners", async (req, res) => {
      try {
        const partners = await PartnerCollection.find({})
          .toArray();
        res.json(partners);
      } catch (error) {
        console.error("Error fetching partners:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // POST a new travel partner
    app.post("/api/partners", async (req, res) => {
      const newPartner = req.body;
      try {
        await PartnerCollection.insertOne(newPartner);
        res.status(200).json({ message: "Partner added successfully" });
      } catch (err) {
        res.status(500).json({ error: "Failed to add rental" });
      }
    });

    // PUT to update a travel partner
    app.put("/api/partners/:id", async (req, res) => {
      const { id } = req.params;
      const { name, company, contact, logoUrl } = req.body;
      try {
        await PartnerCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, company, contact, logoUrl } }
          );
        res.send("Travel partner updated successfully");
      } catch (error) {
        console.error("Error updating rental:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // DELETE a travel partner
    app.delete("/api/partners/:id", async (req, res) => {
      const { id } = req.params;
      try {
        await PartnerCollection.deleteOne({ _id: new ObjectId(id) });
        res.send("Travel partner deleted successfully");
      } catch (error) {
        console.error("Error deleting partner:", error);
        res.status(500).send("Internal Server Error");
      }
    });
		app.use('/api', tripRoute);
		app.use('/api', locationRoute); 
		app.use('/api', hotelRoute); 
		app.use('/api', viewtripRoute); 
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);
	} finally {
		
	}
}
run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("Server is running");
});

app.listen(port, () => {
	console.log(`Current active port: ${port}`);
});
