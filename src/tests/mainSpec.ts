import supertest from "supertest";
import app from "../main";

const req: supertest.SuperTest<supertest.Test> = supertest(app);

describe("Testing image processing", (): void => {
  it("return 200 status for the resized image", async (): Promise<void> => {
    const res: supertest.Response = await req
      .get("/")
      .query({ filename: "icelandwaterfall", width: "200", height: "250" });

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });
});
