import { useEvent, useReferences, useRender } from "../../../../../../hooks";
import Alerts from "../../../../../alerts/Alerts";
import Icons from "../../../../../icons/Icons";
import tempAdmin from "./admin.html";

const iconChevronRight = Icons("chevron-right");
const alertErr = Alerts("error");

export default Admin = () => {
  useRender.html("#main-content", tempAdmin);
  useRender.html(".icon-chevron-right", iconChevronRight);

  useEvent.on(
    "#config-admin-form",
    "submit",
    (e) => {
      e.preventDefault();
      useReferences.effect.show("#loading");
      const formValues = useReferences.forms.serialize(e.target);
      const valuesPars = JSON.stringify(useReferences.forms.qsParse(formValues));

      useReferences.ajax.post(
        "./admin",
        valuesPars,
        (res) => {
          console.log(res);
        },
        (statusCode, errText) => {
          useRender.html("#main-content .alerts", alertErr);
          useRender.text(".alerts .alert-body", `${statusCode}: ${errText}`)
        },
        () => {
          useReferences.effect.hide("#loading");
        }
      );
    }
  );
}