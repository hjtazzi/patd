import chevronDown from "./chevron-down.html";
import chevronRight from "./chevron-right.html";

export default Icons = (icon) => {
  switch (icon) {
    case "chevron-down":
      return chevronDown;
    case "chevron-right":
      return chevronRight;
    default:
      return "";
  }
}