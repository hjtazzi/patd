import { useRender } from "../../../../../../hooks";
import tempAdmin from "./admin.html";

export default Admin = () => {
  useRender.html("#main-content", tempAdmin);
}