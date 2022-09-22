import { useEvent, useReferences, useRender } from "../../../../../../hooks";
import Icons from "../../../../../icons/Icons";
import { setAlertErr, setAlertScs } from "../../setAlerts";
import tempMqtt from "./mqtt.html";

const iconChevronRight = Icons("chevron-right");
const inps = {
  getConfigMqttServer: "#configMqttServer",
  getConfigMqttPort: "#configMqttPort",
  getConfigMqttUser: "#configMqttUser",
  getConfigMqttPass: "#configMqttPass",
  getConfigMqttToken: "#configMqttToken"
};

export default Mqtt = () => {
  useReferences.effect.show("#loading");
  useRender.html("#main-content", tempMqtt);
  useRender.html(".icon-chevron-right", iconChevronRight);

  useReferences.forms.blockSpecial("#configMqttServer");
  useReferences.forms.blockSpecial("#configMqttUser");
  useReferences.forms.blockSpecial("#configMqttPass");
  useReferences.forms.blockSpecial("#configMqttToken");

  // load page
  useReferences.ajax.get(
    "/get-config-mqtt",
    (res) => {
      /* res: {
        getConfigMqttServer: string;
        getConfigMqttPort: string | number;
        getConfigMqttUser: string;
        getConfigMqttPass: string;
        getConfigMqttToken: string;
      } */

      let newRes = {
        getConfigMqttServer: "",
        getConfigMqttPort: "0",
        getConfigMqttUser: "",
        getConfigMqttPass: "",
        getConfigMqttToken: ""
      };

      if (typeof res === "string") {
        newRes = useReferences.forms.qsParse(res);
      } else if (typeof res === "object") {
        newRes = res;
      }

      useReferences.attr.set(inps.getConfigMqttServer, "value", newRes.getConfigMqttServer);
      useReferences.attr.set(inps.getConfigMqttPort, "value", newRes.getConfigMqttPort);
      useReferences.attr.set(inps.getConfigMqttUser, "value", newRes.getConfigMqttUser);
      useReferences.attr.set(inps.getConfigMqttPass, "value", newRes.getConfigMqttPass);
      useReferences.attr.set(inps.getConfigMqttToken, "value", newRes.getConfigMqttToken);
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
    "#config-mqtt-form",
    "submit",
    (e) => {
      e.preventDefault();
      const formValues = useReferences.forms.serialize(e.target);
      const valuesPars = useReferences.forms.qsParse(formValues);

      if (!valuesPars.configMqttServer || !valuesPars.configMqttPort || !valuesPars.configMqttUser || !valuesPars.configMqttPass || !valuesPars.configMqttToken) {
        setAlertErr("مقادیر وارد شده صحیح نمیباشد");
      } else {
        if (valuesPars.configMqttPass.length < 5) {
          setAlertErr("رمز عبور نمیتواند کمتر از 5 کارکتر باشد");
        } else {
          useReferences.effect.show("#loading");
          useReferences.ajax.post(
            "/config-mqtt",
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