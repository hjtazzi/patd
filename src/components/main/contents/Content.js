import { Info, Admin, Ssid, AccessPoint } from "./components";
import menuItems from "./menuItems";

export default Content = (content) => {
  switch (content) {
    case menuItems[0].submenu[0].content:
      Info();
      break;
    case menuItems[1].submenu[0].content:
      Admin();
      break;
    case menuItems[1].submenu[1].content:
      Ssid();
      break;
    case menuItems[1].submenu[2].content:
      AccessPoint();
      break;
    default:
      Info();
      break;
  }
};