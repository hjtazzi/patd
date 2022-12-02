import { useEvent, useReferences, useRender } from "../../../../../../hooks";
import Icons from "../../../../../icons/Icons";
import { setAlertErr, setAlertScs } from "../../setAlerts";
import tempTime from "./time.html";

const iconChevronRight = Icons("chevron-right");

export default Time = () => {
  useReferences.effect.show("#loading");
  useRender.html("#main-content", tempTime);
  useRender.html(".icon-chevron-right", iconChevronRight);

  // load page
  useReferences.ajax.get(
    "/get-config-time",
    (res) => {
      /* res: {
        ntpServers: string[];
        timezones: string[];
      } */
      let newRes = {
        ntpServers: [],
        timezones: []
      };

      if (typeof res === "string") {
        newRes = JSON.parse(res);
      } else if (typeof res === "object") {
        newRes = res;
      }

      if (newRes.ntpServers.length > 0) {
        newRes.ntpServers.map((val) => {
          useRender.append("#configTimeNtp", `<option value="${val}">${val}</option>`);
        });
      }

      if (newRes.timezones.length > 0) {
        newRes.timezones.map((val) => {
          useRender.append("#configTimeTimezone", `<option value="${val}">${val}</option>`);
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

  // submit form
  useEvent.on(
    "#config-time-form",
    "submit",
    (e) => {
      e.preventDefault();
      const formValues = useReferences.forms.serialize(e.target);
      const valuesPars = useReferences.forms.qsParse(formValues);

      if (!valuesPars.configTimeNtp || !valuesPars.configTimeTimezone || !valuesPars.configTimeTime || !valuesPars.configTimeDate) {
        setAlertErr("مقادیر وارد شده صحیح نمیباشد");
      } else {
        useReferences.effect.show("#loading");
        useReferences.ajax.post(
          "/config-time",
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
  );
}