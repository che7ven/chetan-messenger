import moment from "moment";
import jsonfile from "jsonfile";

export const getTimestamp = () => {
  return moment().format("hh:ss a");
};

export const readJSON = (path) => {
  jsonfile.readFile(path, function (err, jsonObj = {}) {
    if (err) console.error(err);

    return jsonObj;
  });
};

export const writeJSON = (path, jsonObj) => {
  jsonfile.writeFile(path, jsonObj, function (err) {
    if (err) console.error(err);
  });
};
