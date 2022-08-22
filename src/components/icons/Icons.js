import chevronDown from "./chevron-down.html";

export default Icons = (icon) => {
  switch (icon) {
    case "chevron-down":
      return chevronDown;

    default:
      return "";
  }
}