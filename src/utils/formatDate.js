import moment from "moment";

export function fYear(date) {
  return moment(date).format("YYYY");
}
