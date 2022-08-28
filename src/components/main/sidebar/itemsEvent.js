import { useEvent, useReferences } from "../../../hooks";
import Content from "../contents/Content";

export default itemsEvent = () => {
  Content("default");

  useEvent.click(
    "[data-expanded=true], [data-expanded=false]",
    (e) => {
      const target = e.target;
      const dataExpanded = useReferences.attr.get(target, "data-expanded");
      const listSubmenuCont = useReferences.traversing.next(target, ".list-submenu-cont");

      if (dataExpanded == "false") {
        useReferences.attr.set(target, "data-expanded", "true");
      } else {
        useReferences.attr.set(target, "data-expanded", "false");
      }

      useReferences.effect.slideToggle(listSubmenuCont, () => {});
    }
  );

  useEvent.click("[data-toggle=item-content]", (e) => {
    const content = useReferences.attr.get(e.target, "data-content");
    useReferences.class.remove("[data-toggle=item-content]", "active");
    useReferences.class.add(e.target, "active");
    Content(content);
  });
}