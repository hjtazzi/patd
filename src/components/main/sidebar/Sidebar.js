import { useEvent, useReferences, useRender } from "../../../hooks";
import tempAside from "./aside.html";

export default Sidebar = () => {
  useRender.append("#collapseNavbarAside", tempAside);

  var asideId = "#collapseNavbarAside";
  var btnId = "#collapseNavbarAsideBtn";
  var btnAttr = "data-expanded";
  var asideBgId = "#navbar-aside-bg";

  var hideSide = () => {
    useReferences.attr.set(btnId, btnAttr, "false");
    useReferences.class.remove(asideId, "show");
    if (useReferences.window.width() < 768) {
      useReferences.css.set(document.body, "overflow", "");
      useReferences.class.add(asideBgId, "hidden");
    }
  }

  var showSide = () => {
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
}