import { useRender, useReferences } from "../../../../../hooks";
import { setAlertErr } from "../setAlerts";
import tempInfo from "./info.html";

const inps = {
  getInfoName: "#infoName",
  getInfoVer: "#infoVer",
  getInfoMac: "#infoMac",
  getInfoSsidName: "#infoSsidName",
  getInfoAccessName: "#infoAccessName"///
};

export default Info = () => {
  useReferences.effect.show("#loading");
  useRender.html("#main-content", tempInfo);
  useReferences.class.add(".i-m-0 a[data-toggle=item-content]", "active");

  useReferences.ajax.get(
    "/get-info",
    (res) => {
      /* res: {
        getInfoName: string;
        getInfoVer: string;
        getInfoMac: string;
        getInfoSsidName: string;
        getInfoAccessName: string;
      } */

      let newRes = {
        getInfoName: "",
        getInfoVer: "",
        getInfoMac: "",
        getInfoSsidName: "",
        getInfoAccessName: ""
      }

      if (typeof res === "string") {
        newRes = useReferences.forms.qsParse(res);
      } else if (typeof res === "object") {
        newRes = res;
      }

      useReferences.attr.set(inps.getInfoName, "value", newRes.getInfoName);
      useReferences.attr.set(inps.getInfoVer, "value", newRes.getInfoVer);
      useReferences.attr.set(inps.getInfoMac, "value", newRes.getInfoMac);
      useReferences.attr.set(inps.getInfoSsidName, "value", newRes.getInfoSsidName);
      useReferences.attr.set(inps.getInfoAccessName, "value", newRes.getInfoAccessName);
    },
    (statusCode, errText) => {
      setAlertErr(`${statusCode}: ${errText}`);
    },
    () => {
      useReferences.effect.hide("#loading");
    }
  );
}