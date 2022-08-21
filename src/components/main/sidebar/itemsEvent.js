import { useEvent, useReferences } from "../../../hooks";
import Content from "../contents/Content";


export default itemsEvent = () => {
  useEvent.click("[data-toggle=item-content]", (e) => {
    var content = useReferences.attr.get(e.target, "data-content");
    Content(content);
  });
}