import tempError from "./alert-error.html";
import tempSuccess from "./alert-success.html";

export default Alerts = (type) => {
  switch (type) {
    case "error":
      return tempError;
    case "success":
      return tempSuccess;
    default:
      return "";
  }
}