import Alerts from "../../../alerts/Alerts";
import { useRender } from "../../../../hooks";
const alertErr = Alerts("error");
const alertScs = Alerts("success");

export const setAlertErr = (text) => {
  useRender.html("#main-content .alerts", alertErr);
  useRender.html(".alerts .alert-body", text);
}
export const setAlertScs = (text) => {
  useRender.html("#main-content .alerts", alertScs);
  useRender.html(".alerts .alert-body", text);
}