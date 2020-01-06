import { formdata } from "../src/index";
import { Aex } from "@aex/core";

import * as rp from "request-promise";

test("Should parse formdata", async () => {
  let entered = false;
  const aex = new Aex();

  aex.use(formdata);
  // tslint:disable-next-line:variable-name
  aex.use(async (_req: any, res: any, scope: any) => {
    expect(scope.outer.body).toBeTruthy();
    expect(scope.outer.body.some === "payload").toBeTruthy();
    entered = true;
    res.end("ok");
  });
  const port = 10000 + Math.floor(Math.random() * 1000);
  const server = await aex.start(port);
  const options = {
    method: "POST",
    uri: "http://localhost:" + port,
    // tslint:disable-next-line:object-literal-sort-keys
    form: {
      some: "payload",
    },
  };
  const data = await rp(options);
  expect(data === "ok").toBeTruthy();
  expect(entered).toBeTruthy();
  server.close();
});
