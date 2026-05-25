const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/doctors", require("./routes/doctorRoutes"));
app.use("/patients", require("./routes/patientRoutes"));
app.use("/appointments", require("./routes/appointmentRoutes"));

app.use(express.static("frontend"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});