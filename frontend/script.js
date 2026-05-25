const doctorContainer =
  document.getElementById("doctorContainer");

const doctorSelect =
  document.getElementById("doctorId");

const appointmentsList =
  document.getElementById("appointmentsList");

const form =
  document.getElementById("appointmentForm");

function scrollToAppointment(){

  document
    .getElementById("appointment")
    .scrollIntoView({
      behavior:"smooth"
    });
}

async function loadDoctors(){

  const res =
    await fetch("/doctors");

  const doctors =
    await res.json();

  doctorContainer.innerHTML = "";

  doctors.forEach((doctor)=>{

    const card =
      document.createElement("div");

    card.classList.add("doctor-card");

    card.innerHTML = `

      <h3>${doctor.name}</h3>

      <p>
        <strong>Specialization:</strong>
        ${doctor.specialization}
      </p>

      <p>
        🕒 Timing:
        10:00 AM - 4:00 PM
      </p>

      <p>
        📅 Available:
        Monday - Saturday
      </p>

      <p>
        ⭐ Experience:
        8+ Years
      </p>

    `;

    doctorContainer.appendChild(card);

    const option =
      document.createElement("option");

    option.value = doctor.id;

    option.textContent =
      `${doctor.name} (${doctor.specialization})`;

    doctorSelect.appendChild(option);
  });
}

form.addEventListener("submit", async(e)=>{

  e.preventDefault();

  const patientName =
    document.getElementById("patientName").value;

  const patientAge =
    document.getElementById("patientAge").value;

  await fetch("/patients",{

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({
      name:patientName,
      age:patientAge
    })
  });

  const patientRes =
    await fetch("/patients");

  const patients =
    await patientRes.json();

  const lastPatient =
    patients[patients.length - 1];

  const appointmentDate =
    new Date(
      document
        .getElementById("appointmentDate")
        .value
    )
      .toISOString()
      .slice(0,19)
      .replace("T"," ");

  const appointmentRes =
    await fetch("/appointments",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        patient_id:lastPatient.id,

        doctor_id:
          doctorSelect.value,

        appointment_date:
          appointmentDate
      })
    });

  const result =
    await appointmentRes.json();

  alert(result.message);

  form.reset();

  loadAppointments();
});

async function loadAppointments(){

  const res =
    await fetch("/appointments");

  const data =
    await res.json();

  appointmentsList.innerHTML = "";

  data.forEach((appointment)=>{

    const card =
      document.createElement("div");

    card.classList.add("record-card");

    card.innerHTML = `

      <h3>${appointment.doctor}</h3>

      <p>
        <strong>Patient:</strong>
        ${appointment.patient}
      </p>

      <p>
        <strong>Date:</strong>
        ${new Date(
          appointment.appointment_date
        ).toLocaleString()}
      </p>

    `;

    appointmentsList.appendChild(card);
  });
}

loadDoctors();

loadAppointments();
async function searchDoctorAppointments(){

  const doctorId =
    document.getElementById(
      "searchDoctorId"
    ).value;

  const res =
    await fetch("/appointments");

  const data =
    await res.json();

  const doctorAppointments =
    document.getElementById(
      "doctorAppointments"
    );

  doctorAppointments.innerHTML = "";

  const filtered =
    data.filter(
      (appointment)=>
        appointment.doctor_id == doctorId
    );

  if(filtered.length === 0){

    doctorAppointments.innerHTML =
      "<h3>No Appointments Found</h3>";

    return;
  }

  filtered.forEach((appointment)=>{

    const card =
      document.createElement("div");

    card.classList.add("record-card");

    card.innerHTML = `

      <h3>${appointment.patient}</h3>

      <p>
        Doctor:
        ${appointment.doctor}
      </p>

      <p>
        Date:
        ${new Date(
          appointment.appointment_date
        ).toLocaleString()}
      </p>

    `;

    doctorAppointments.appendChild(card);
  });
}