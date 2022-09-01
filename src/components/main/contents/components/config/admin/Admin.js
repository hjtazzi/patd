import { useEvent, useReferences, useRender } from "../../../../../../hooks";
import Icons from "../../../../../icons/Icons";
import { setAlertErr, setAlertScs } from "../../setAlerts";
import tempAdmin from "./admin.html";

const iconChevronRight = Icons("chevron-right");

export default Admin = () => {
  useReferences.effect.show("#loading");
  useRender.html("#main-content", tempAdmin);
  useRender.html(".icon-chevron-right", iconChevronRight);

  // load page
  useReferences.ajax.get(
    "/get-config-admin",
    (res) => {
      // res: { getConfigAdminUser: string; getConfigAdminPass: string; }
      let newRes = { getConfigAdminUser: "", getConfigAdminPass: "" };

      if (typeof res === "string") {
        newRes = useReferences.forms.qsParse(res);
      } else if (typeof res === "object") {
        newRes = res;
      }

      if (newRes.getConfigAdminUser && newRes.getConfigAdminPass) {
        useReferences.attr.set("#configAdminUser", "value", newRes.getConfigAdminUser);
        useReferences.attr.set("#configAdminPass", "value", newRes.getConfigAdminPass);
      }

    },
    (statusCode, errText) => {
      setAlertErr(`${statusCode}: ${errText}`);
    },
    () => {
      useReferences.effect.hide("#loading");
    }
  );

  // submit form
  useEvent.on(
    "#config-admin-form",
    "submit",
    (e) => {
      e.preventDefault();
      const formValues = useReferences.forms.serialize(e.target);
      const valuesPars = useReferences.forms.qsParse(formValues);

      if (!valuesPars.configAdminUser || !valuesPars.configAdminPass) {
        setAlertErr("مقادیر وارد شده صحیح نمیباشد");
      } else {
        if (valuesPars.configAdminPass.length < 8) {
          setAlertErr("رمز عبور نمیتواند کمتر از 8 کارکتر باشد");
        } else {
          useReferences.effect.show("#loading");
          useReferences.ajax.post(
            "/config-admin",
            formValues,
            (res) => {
              setAlertScs("عملیات با موفقیت انجام شد");
            },
            (statusCode, errText) => {
              setAlertErr(`${statusCode}: ${errText}`);
            },
            () => {
              useReferences.effect.hide("#loading");
            }
          );
        }
      }
    }
  );
}