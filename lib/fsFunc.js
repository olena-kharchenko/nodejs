import fs from "fs/promises";

const readFile = (path) =>
  fs.readFile(path, "utf8", (err, data) => {
    if (err) throw err;
    return data;
    // console.log(JSON.parse(data));
    // return JSON.parse(data);
  });

const writeFile = (file, data) =>
  fs.writeFile(`${file}`, data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

const fsFunc = { readFile, writeFile };

export default fsFunc;
