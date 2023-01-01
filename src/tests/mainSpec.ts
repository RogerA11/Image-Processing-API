import supertest from "supertest";
import app from "../main";

const req: supertest.SuperTest<supertest.Test> = supertest(app);

describe("Testing root endpoint", (): void => {
  it("return 200 status for root endpoint", async (): Promise<void> => {
    const res: supertest.Response = await req.get("/");

    expect(res.status).toBe(200);
  });
});
