import { useRender } from "../../../../../../hooks";
import tempAccess from "./access-point.html";

export default AccessPoint = () => {
  useRender.html("#main-content", tempAccess);
}