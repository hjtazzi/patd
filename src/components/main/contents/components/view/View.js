import { useRender } from "../../../../../hooks";
import Icons from "../../../../icons/Icons";
import tempView from "./view.html";

const iconChevronRight = Icons("chevron-right");

export default View = () => {
  useRender.html("#main-content", tempView);
  useRender.html(".icon-chevron-right", iconChevronRight);
}