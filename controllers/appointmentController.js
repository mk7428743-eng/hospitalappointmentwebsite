const db = require("../db");

exports.getAppointments = (req, res) => {
  const sql = `
    SELECT appointments.id,
           patients.name AS patient,
           doctors.name AS doctor,
           appointment_date
    FROM appointments
    JOIN patients
      ON appointments.patient_id = patients.id
    JOIN doctors
      ON appointments.doctor_id = doctors.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.bookAppointment = (req, res) => {
  const { patient_id, doctor_id, appointment_date } = req.body;

  const checkSql = `
    SELECT * FROM appointments
    WHERE doctor_id = ?
    AND appointment_date = ?
  `;

  db.query(
    checkSql,
    [doctor_id, appointment_date],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      if (result.length > 0) {
        return res.json({
          message: "Time slot already booked",
        });
      }

      const insertSql = `
        INSERT INTO appointments
        (patient_id, doctor_id, appointment_date)
        VALUES (?, ?, ?)
      `;

      db.query(
        insertSql,
        [patient_id, doctor_id, appointment_date],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          }

          res.json({
            message: "Appointment Booked Successfully",
          });
        }
      );
    }
  );
};