/**
 * Copyright(c) 2020 calidion <calidion@gmail.com>
 * Apache 2.0 Licensed
 */

import * as parser from "body-parser";
import { promisify } from "util";

const cb = parser.urlencoded({ extended: false });
export async function formdata(req: any, res: any, scope: any) {
  const pcb = promisify(cb);
  await pcb(req, res);
  scope.outer.body = req.body;
  delete req.body;
}
