import { useReferences, useRender } from "../../../../../../hooks";
import Icons from "../../../../../icons/Icons";
import tempData from "./data.html";

const iconChevronRight = Icons("chevron-right");

export default Data = () => {
  useRender.html("#main-content", tempData);
  useRender.html(".icon-chevron-right", iconChevronRight);
}