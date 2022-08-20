import { useRender } from "../../hooks";
import tempMain from "./main.html";

export default Main = () => {
  useRender.append("#root", tempMain);
}