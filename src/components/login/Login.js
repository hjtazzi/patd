import { useRender, useReferences, useEvent } from "../../hooks";
import tempLogin from "./login.html";
import Alerts from "../alerts/Alerts";
import Header from "../header/Header";
import Main from "../main/Main";

const alertErr = Alerts("error");
const setAlertErr = (text) => {
  useRender.html("#login-body .alerts", alertErr);
  useRender.html(".alerts .alert-body", text);
}

export default Login = () => {
  useRender.html("#root", tempLogin);
  useReferences.effect.hide("#loading");

  useEvent.on(
    "#login-form",
    "submit",
    (e) => {
      e.preventDefault();
      const formValues = useReferences.forms.serialize(e.target);
      const valuesPars = useReferences.forms.qsParse(formValues);

      if (!valuesPars.userLoginUser || !valuesPars.userLoginPass) {
        setAlertErr("مقادیر وارد شده صحیح نمیباشد");
      } else {
        if (valuesPars.userLoginUser.length < 4 || valuesPars.userLoginPass.length < 4) {
          setAlertErr("مقادیر وارد شده نمیتواند کمتر از 4 حرف باشد");
        } else {
          useReferences.effect.show("#loading");
          useReferences.ajax.post(
            "/user-login",
            formValues,
            (res) => {
              // load app
              useRender.html("#root", "");
              Header();
              Main();
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
  )
}