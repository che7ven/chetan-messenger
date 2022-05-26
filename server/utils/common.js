import moment from "moment";

export const getTimestamp = () => {
  return moment().format("hh:ss a");
};
