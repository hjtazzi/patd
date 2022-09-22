import { useEvent, useReferences, useRender } from "../../../../../../hooks";
import Icons from "../../../../../icons/Icons";
import { setAlertErr, setAlertScs } from "../../setAlerts";
import tempAdmin from "./admin.html";

const iconChevronRight = Icons("chevron-right");

export default Admin = () => {
  useReferences.effect.show("#loading");
  useRender.html("#main-content", tempAdmin);
  useRender.html(".icon-chevron-right", iconChevronRight);

  useReferences.forms.blockSpecial("#configAdminUser");
  useReferences.forms.blockSpecial("#configAdminPass");

  // load page
  useReferences.ajax.get(
    "/get-config-admin",
    (res) => {
      // res: { getConfigAdminUser: string; }
      let newRes = { getConfigAdminUser: "" };

      if (typeof res === "string") {
        newRes = useReferences.forms.qsParse(res);
      } else if (typeof res === "object") {
        newRes = res;
      }

      if (newRes.getConfigAdminUser) {
        useReferences.attr.set("#configAdminUser", "value", newRes.getConfigAdminUser);
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

      if (!valuesPars.configAdminUser || !valuesPars.configAdminPass || !valuesPars.configAdminConfPass) {
        setAlertErr("مقادیر وارد شده صحیح نمیباشد");
      } else {
        if (valuesPars.configAdminUser.length < 4 || valuesPars.configAdminPass.length < 4 || valuesPars.configAdminConfPass.length < 4) {
          setAlertErr("مقادیر وارد شده نمیتواند کمتر از 4 کارکتر باشد");
        } else {
          if (valuesPars.configAdminPass !== valuesPars.configAdminConfPass) {
            setAlertErr("رمز عبور و تایید رمز عبور برابر نیست");
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
    }
  );
}