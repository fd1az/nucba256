import * as url from "url";
import fs from "fs";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const context = process.argv.slice(2)[0];

var dir = `${__dirname}/../src/core/business/${context}`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, "0744");
  fs.mkdirSync(`${dir}/api`, "0744");
  fs.mkdirSync(`${dir}/api/models`, "0744");
  fs.mkdirSync(`${dir}/api/routes`, "0744");
  fs.mkdirSync(`${dir}/commands`, "0744");
  fs.mkdirSync(`${dir}/domain`, "0744");
  fs.mkdirSync(`${dir}/domain/aggregates`, "0744");
  fs.mkdirSync(`${dir}/domain/events`, "0744");
  fs.mkdirSync(`${dir}/domain/models`, "0744");
  fs.mkdirSync(`${dir}/domain/models/agreggates`, "0744");
  fs.mkdirSync(`${dir}/domain/models/valueObjects`, "0744");
  fs.mkdirSync(`${dir}/domain/valueObjects`, "0744");
  fs.mkdirSync(`${dir}/mappers`, "0744");
  fs.mkdirSync(`${dir}/repository`, "0744");
  fs.mkdirSync(`${dir}/service`, "0744");
  fs.mkdirSync(`${dir}/suscribers`, "0744");
}
