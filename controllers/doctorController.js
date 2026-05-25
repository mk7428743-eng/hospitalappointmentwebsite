const db = require("../db");

exports.getDoctors = (req, res) => {
  db.query("SELECT * FROM doctors", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.addDoctor = (req, res) => {
  const { name, specialization } = req.body;

  db.query(
    "INSERT INTO doctors (name, specialization) VALUES (?, ?)",
    [name, specialization],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Doctor Added Successfully",
      });
    }
  );
};