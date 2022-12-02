import { useEvent, useReferences, useRender } from "../../../../../../hooks";
import Icons from "../../../../../icons/Icons";
import { setAlertErr, setAlertScs } from "../../setAlerts";
import tempAccess from "./access-point.html";

const iconChevronRight = Icons("chevron-right");

export default AccessPoint = () => {
  useReferences.effect.show("#loading");
  useRender.html("#main-content", tempAccess);
  useRender.html(".icon-chevron-right", iconChevronRight);

  useReferences.forms.blockSpecial("#configAccessName");
  useReferences.forms.blockSpecial("#configAccessPass");

  // load page
  useReferences.ajax.get(
    "/get-config-access",
    (res) => {
      /* res: {
        getConfigAccessName: string;
        getConfigAccessPass: string;
      } */
      let newRes = { getConfigAccessName: "", getConfigAccessPass: "" };

      if (typeof res === "string") {
        newRes = useReferences.forms.qsParse(res);
      } else if (typeof res === "object") {
        newRes = res;
      }

      if (newRes.getConfigAccessName && newRes.getConfigAccessPass) {
        useReferences.attr.set("#configAccessName", "value", newRes.getConfigAccessName);
        useReferences.attr.set("#configAccessPass", "value", newRes.getConfigAccessPass);
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
    "#config-access-point-form",
    "submit",
    (e) => {
      e.preventDefault();
      const formValues = useReferences.forms.serialize(e.target);
      const valuesPars = useReferences.forms.qsParse(formValues);

      if (!valuesPars.configAccessName || !valuesPars.configAccessPass) {
        setAlertErr("مقادیر وارد شده صحیح نمیباشد");
      } else {
        if (valuesPars.configAccessName.length < 3) {
          setAlertErr("نام نمیتواند کمتر از 3 کارکتر باشد");
        } else if (valuesPars.configAccessPass.length < 8) {
          setAlertErr("رمز عبور نمیتواند کمتر از 8 کارکتر باشد");
        } else {
          useReferences.effect.show("#loading");
          useReferences.ajax.post(
            "/config-access",
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