import { useEvent, useReferences, useRender } from "../../../../../../hooks";
import Icons from "../../../../../icons/Icons";
import { setAlertErr, setAlertScs } from "../../setAlerts";
import tempSsid from "./ssid.html";

const iconChevronRight = Icons("chevron-right");
let ssidRes = null;

export default Ssid = () => {
  useReferences.effect.show("#loading");
  useRender.html("#main-content", tempSsid);
  useRender.html(".icon-chevron-right", iconChevronRight);

  useReferences.forms.blockSpecial("#configSsidName");
  useReferences.forms.blockSpecial("#configSsidPass");

  const appendNames = (res) => {
    let newRes = [];

    if (typeof res === "string") {
      newRes = JSON.parse(res);
    } else if (typeof res === "object") {
      newRes = res;
    }

    if (newRes.length > 0) {
      useRender.html("#configSsidNames", `<option value="other" selected>other</option>`)
      newRes.map((val) => {
        useRender.append("#configSsidNames", `<option value="${val}">${val}</option>`);
      });
    }
  }

  // load page
  useReferences.ajax.get(
    "/get-config-ssid",
    (res) => {
      // res: string[];
      ssidRes = res;
      appendNames(res);
    },
    (statusCode, errText) => {
      setAlertErr(`${statusCode}: ${errText}`);
    },
    () => {
      useReferences.effect.hide("#loading");
    }
  );

  // refresh Names list
  const timeout = 3000;

  const namesInterval = setInterval(() => {
    const thisContent = document.getElementById("config-ssid-content");
    if (thisContent) {
      useReferences.ajax.get(
        "/get-config-ssid",
        (res) => {
          // res: string[];
          if (res !== ssidRes) {
            ssidRes = res;
            appendNames(res);
          }
        },
        () => { },
        () => { },
        timeout
      );
    } else {
      clearInterval(namesInterval);
    }
  }, timeout);

  // change configSsidNames select
  useEvent.on(
    "#configSsidNames",
    "change",
    (e) => {
      const thisVal = e.target.value;

      if (thisVal === "other") {
        useReferences.attr.remove("#configSsidName", "disabled");
      } else {
        useReferences.attr.set("#configSsidName", "disabled", "disabled");
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

      if (valuesPars.configSsidNames) {
        if (valuesPars.configSsidNames === "other") {
          if (!valuesPars.configSsidName || !valuesPars.configSsidPass) {
            setAlertErr("مقادیر وارد شده صحیح نمیباشد");
          } else {
            if (valuesPars.configSsidName.length < 3) {
              setAlertErr("نام نمیتواند کمتر از 3 کارکتر باشد");
            } else if (valuesPars.configSsidPass.length < 8) {
              setAlertErr("رمز عبور نمیتواند کمتر از 8 کارکتر باشد");
            } else {
              req();
            }
          }
        } else {
          if (!valuesPars.configSsidPass) {
            setAlertErr("مقادیر وارد شده صحیح نمیباشد");
          } else {
            if (valuesPars.configSsidPass.length < 8) {
              setAlertErr("رمز عبور نمیتواند کمتر از 8 کارکتر باشد");
            } else {
              req();
            }
          }
        }
      }
    }
  );
}