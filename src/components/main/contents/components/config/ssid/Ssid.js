import { useEvent, useReferences, useRender } from "../../../../../../hooks";
import Icons from "../../../../../icons/Icons";
import { setAlertErr, setAlertScs } from "../../setAlerts";
import tempSsid from "./ssid.html";

const iconChevronRight = Icons("chevron-right");

export default Ssid = () => {
  useReferences.effect.show("#loading");
  useRender.html("#main-content", tempSsid);
  useRender.html(".icon-chevron-right", iconChevronRight);

  // load page
  useReferences.ajax.get(
    "/get-config-ssid",
    (res) => {
      // res: string[];
      let newRes = [];

      if (typeof res === "string") {
        newRes = JSON.parse(res);
      } else if (typeof res === "object") {
        newRes = res;
      }

      if (newRes.length > 0) {
        newRes.map((val) => {
          useRender.prepend("#confirmSsidNames", `<option value="${val}">${val}</option>`);
        });
      }
    },
    (statusCode, errText) => {
      setAlertErr(`${statusCode}: ${errText}`);
    },
    () => {
      useReferences.effect.hide("#loading");
    }
  );

  // change confirmSsidNames select
  useEvent.on(
    "#confirmSsidNames",
    "change",
    (e) => {
      const thisVal = e.target.value;
      const inpName = "#confirmSsidName";
      const inpPass = "#confirmSsidPass";

      if (thisVal === "other") {
        useReferences.attr.remove(inpName, "disabled");
        useReferences.attr.remove(inpPass, "disabled");
      } else {
        useReferences.attr.set(inpName, "disabled", "disabled");
        useReferences.attr.set(inpPass, "disabled", "disabled");
      }
    }
  )

  // submit form
  useEvent.on(
    "#config-ssid-form",
    "submit",
    (e) => {
      e.preventDefault();
      const formValues = useReferences.forms.serialize(e.target);
      const valuesPars = useReferences.forms.qsParse(formValues);

      const req = () => {
        useReferences.effect.show("#loading");
        useReferences.ajax.post(
          "/config-ssid",
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

      if (valuesPars.confirmSsidNames === "other") {
        if (!valuesPars.confirmSsidName || !valuesPars.confirmSsidPass) {
          setAlertErr("مقادیر وارد شده صحیح نمیباشد");
        } else {
          if (valuesPars.confirmSsidPass.length < 8) {
            setAlertErr("رمز عبور نمیتواند کمتر از 8 کارکتر باشد");
          } else {
            req();
          }
        }
      } else {
        req();
      }
    }
  );
}