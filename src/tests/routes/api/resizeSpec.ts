import supertest from "supertest";
import app from "../../../main";

const req: supertest.SuperTest<supertest.Test> = supertest(app);

describe("Testing endpoint responses", (): void => {
  
  it("return 400 status for not including any parameters", async (): Promise<void> => {
  const res: supertest.Response = await req.get("/resize");

  expect(res.status).toBe(400);
  expect(res.body.error).toEqual(
    "Parameters required with type [Filename: string, width: number (>0), height: number (>0)]");
  });

  it("return 400 status for not including other parameters", async (): Promise<void> => {
    const res: supertest.Response = await req.get(
      "/resize?filename=icelandwaterfall");

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual(
      "Parameters required with type [Filename: string, width: number (>0), height: number (>0)]");
  });

  it("return 400 status if either width or height parameters are negative", async (): Promise<void> => {
    const res: supertest.Response = await req.get(
      "/resize?filename=icelandwaterfall&width=-200&height=399");

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual("Input value can not be negative");
  });

  it("return 400 status if either width or height parameters are equal to 0", async (): Promise<void> => {
    const res: supertest.Response = await req.get(
      "/resize?filename=icelandwaterfall&width=0&height=399");

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual(
      "Parameters required with type [Filename: string, width: number (>0), height: number (>0)]");
  });

  it("return 400 status if either width or height parameters are strings", async (): Promise<void> => {
    const res: supertest.Response = await req.get(
      "/resize?filename=icelandwaterfall&width=400ab&height=399");

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual(
      "Parameters required with type [Filename: string, width: number (>0), height: number (>0)]");
  });

  it("return 400 status if image does not exist in directory", async (): Promise<void> => {
    const res: supertest.Response = await req.get(
      "/resize?filename=landfall&width=222&height=333");

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual("Image does not exist.");
  });

  it("return 200 status with parameters included", async (): Promise<void> => {
    const res: supertest.Response = await req.get(
      "/resize?filename=icelandwaterfall&width=111&height=222");

    expect(res.status).toBe(200);
  });
});
