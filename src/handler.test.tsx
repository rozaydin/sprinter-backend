import { hello, initFireStore } from "./handler";
// import { expect, test } from "jest";

test("lambda test", async () => {

    const result = await hello({}, {});
    const body = JSON.parse(result.body);

    expect(body["message"]).toBe("Hello From Type Script!");
    expect(result.statusCode).toBe(200);
});

test("store user in firestore db", async () => {

    // initDB
    const firestore = initFireStore();

    
    const user = {
        name: "ridvan",
        email: "ridvanozaydin@gmail.com",
        password: "secret"
      }

    await firestore.collection("users").doc("ridvanozaydin@gmail.com").set(user);
    const rozaydin = await firestore.collection("users").doc("ridvanozaydin@gmail.com").get();
    console.log(rozaydin.get("email"));
    console.log(rozaydin.data());
    
});