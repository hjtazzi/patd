import { useRender, useReferences, useEvent } from '../../hooks';
import tempHeader from './header.html';
import logoUrl from "../../../imgs/logo.png";

export default Header = () => {
  useRender.append("#root", tempHeader);
  useReferences.attr.set("#header-logo", "src", logoUrl);

  var btnId = "#collapseNavbarAsideBtn";
  var btnAttr = "data-expanded";

  useEvent.click(btnId, (e) => {
    if (useReferences.attr.get(btnId, btnAttr) === "true") {
      useReferences.attr.set(btnId, btnAttr, "false");
    } else {
      useReferences.attr.set(btnId, btnAttr, "true");
    }
  });

  
}