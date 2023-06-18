# hospital_api
## Theme:
  - We’re going to design an API for the doctors of a Hospital which has been allocated by the
  govt for testing and quarantine + well being of COVID-19 patients
  - There can be 2 types of Users
    - Doctors
    - Patients
  - Doctors can log in
  - Each time a patient visits, the doctor will follow 2 steps
    - Register the patient in the app (using phone number, if the patient already exists, just
      return the patient info in the API)
     - After the checkup, create a Report
  - Patient Report will have the following fields
    - Created by doctor
    - Status: 
     - Can be either of: [Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit]
    - Date
 ## APIs(POST)
  - /doctors/register  -> registering a doctor
      req body
      {
        username: String, required,
        password: String, required,
        confirm_password: String, required
      }
  - /doctors/login  -> Login for doctor
      req body
      {
        username: String, required,
        password: String, required
      }
      res
      {
        token
      }
  - /patients/register -> Registers a patient
      req body
      {
        name: String, required,
        address: String, required,
        phone: String, required
      }
  - /patients/:id/create_report  -> Creates a record for the patient by an authenticated doctor
      id-> doctors id
      provide jwt created in /doctors/login to authenticate if created by a genuine doctor
      {
        phone: String, required
        status: String, required
      }
  - /patients/:id/all_reports → List all the reports of a patient oldest to latest
      id -> patient's id 
  - /reports/:status → List all the reports of all the patients filtered by a specific status
      status -> [Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit]
