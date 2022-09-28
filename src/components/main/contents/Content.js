import { Info, Admin, Ssid, AccessPoint, Mqtt, Time, Data, Log } from "./components";
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
    case menuItems[1].submenu[3].content:
      Mqtt();
      break;
    case menuItems[1].submenu[4].content:
      Time();
      break;
    case menuItems[2].submenu[0].content:
      Data();
      break;
    case menuItems[2].submenu[1].content:
      Log();
      break;
    default:
      Info();
      break;
  }
};