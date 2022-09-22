import timestampToDate from "timestamp-to-date";
import { useEvent, useReferences, useRender } from "../../../hooks";
import tempAside from "./aside.html";
import itemsEvent from "./itemsEvent";
import NavMenu from "./NavMenu";

export default Sidebar = () => {
  useRender.append("#collapseNavbarAside", tempAside);

  const appVersion = "v1.0.0";
  const asideId = "#collapseNavbarAside";
  const btnId = "#collapseNavbarAsideBtn";
  const btnAttr = "data-expanded";
  const asideBgId = "#navbar-aside-bg";

  // time
  let cTime = 0;
  const getNewTime = (yyyy, MM, dd, HH, mm, ss, ms = 0) => {
    const d = new Date(yyyy, MM, dd, HH, mm, ss, ms);
    return d.getTime() / 1000;
  }
  useReferences.ajax.get(
    "/get-time",
    (res) => {
      /* res: {
        yyyy: number;
        MM: number;
        dd: number;
        HH: number;
        mm: number;
        ss: number;
      } */
      let newRes = { yyyy: 1970, MM: 0, dd: 1, HH: 0, mm: 0, ss: 0 };

      if (typeof res === "string") {
        newRes = useReferences.forms.qsParse(res);
      } else if (typeof res === "object") {
        newRes = res;
      }

      cTime = getNewTime(newRes.yyyy, newRes.MM, newRes.dd, newRes.HH, newRes.mm, newRes.ss);
    },
    () => { },
    () => {
      const timerInterval = setInterval(() => {
        cTime++;
        useRender.text("#aside-footer-timer", timestampToDate(cTime * 1000, 'yyyy/MM/dd HH:mm:ss'));
      }, 1000);
    }
  );
  useRender.text("#aside-footer-version", appVersion);

  function hideSide() {
    useReferences.attr.set(btnId, btnAttr, "false");
    useReferences.class.remove(asideId, "show");
    if (useReferences.window.width() < 768) {
      useReferences.css.set(document.body, "overflow", "");
      useReferences.class.add(asideBgId, "hidden");
    }
  }

  function showSide() {
    useReferences.attr.set(btnId, btnAttr, "true");
    useReferences.class.add(asideId, "show");
    if (useReferences.window.width() < 768) {
      useReferences.css.set(document.body, "overflow", "hidden");
      useReferences.class.remove(asideBgId, "hidden");
    }
  }

  if (useReferences.window.width() < 768) {
    hideSide();
  }

  useEvent.on(window, "resize", (e) => {
    if (useReferences.window.width() >= 768) {
      showSide();
    } else {
      hideSide();
    }
  });

  useEvent.click(btnId, (e) => {
    if (useReferences.attr.get(btnId, btnAttr) === "true") {
      hideSide();
    } else {
      showSide();
    }
  });

  useEvent.click(asideBgId, (e) => {
    hideSide();
  });

  NavMenu();
  itemsEvent();
}