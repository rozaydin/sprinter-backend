import { hello } from "./handler";
// import { expect, test } from "jest";

test("lambda test", async () => {

    const result = await hello({}, {});
    const body = JSON.parse(result.body);

    expect(body["message"]).toBe("Hello From Type Script!");
    expect(result.statusCode).toBe(200);
});