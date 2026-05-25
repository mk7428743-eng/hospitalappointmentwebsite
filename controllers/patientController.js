const db = require("../db");

exports.getPatients = (req, res) => {
  db.query("SELECT * FROM patients", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.addPatient = (req, res) => {
  const { name, age } = req.body;

  db.query(
    "INSERT INTO patients (name, age) VALUES (?, ?)",
    [name, age],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Patient Added Successfully",
      });
    }
  );
};