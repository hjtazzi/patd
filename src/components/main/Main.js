import { useRender } from "../../hooks";
import tempMain from "./main.html";
import Sidebar from "./sidebar/Sidebar";

export default Main = () => {
  useRender.append("#root", tempMain);

  Sidebar();
}