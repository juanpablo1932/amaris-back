import supertest from "supertest";
import AppDataSource from "../config/datasource";
import { app } from "../config/createServer";

const token = ""; //add valid token here

describe("Appointments", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });
  describe("getAppointment", () => {
    it("Unauthorized", async () => {
      await supertest(app).get(`/appointments`).expect(401);
    });
    it("Should return a list of appointments", async () => {
      const response = await supertest(app)
        .get(`/appointments`)
        .set("Authorization", `Bearer ${token}`);

      if (response.status !== 200) {
        console.log(response.body);
      }

      expect(response.status).toBe(200);
    });
    it("Should create a new appointment", async () => {
      const response = await supertest(app)
        .post(`/appointments`)
        .send({
          date: "2024-02-14T16:30:00.000Z",
          doctor_id: "", //add valid doctor_id here
          patient_id: "", //add valid patient_id here
          type_id: "", //add valid type_id here
        })
        .set("Authorization", `Bearer ${token}`);

      if (response.status !== 200) {
        console.log(response.body);
      }

      expect(response.status).toBe(200);
    });
  });
});
