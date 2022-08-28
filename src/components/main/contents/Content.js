import { AccessPoint, Admin } from "./components";
import menuItems from "./menuItems";

export default Content = (content) => {
  switch (content) {
    case menuItems[0].submenu[0].content:
      Admin();
      break;
    case menuItems[0].submenu[1].content:
      AccessPoint();
      break;
    default:
      Admin();
      break;
  }
};