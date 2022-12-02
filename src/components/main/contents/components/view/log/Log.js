import { useReferences, useRender } from "../../../../../../hooks";
import Icons from "../../../../../icons/Icons";
import { setAlertErr, setAlertScs } from "../../setAlerts";
import tempLog from "./log.html";

const iconChevronRight = Icons("chevron-right");
let logsRes = null;

export default Log = () => {
  useReferences.effect.show("#loading");
  useRender.html("#main-content", tempLog);
  useRender.html(".icon-chevron-right", iconChevronRight);

  const setLogs = (res) => {
    let newRes = [];

    if (typeof res === "string") {
      newRes = JSON.parse(res);
    } else if (typeof res === "object") {
      newRes = res;
    }

    const len = newRes.length;
    useRender.html("#view-log-body", "");
    if (len > 0) {
      newRes.map((val, i) => {
        useRender.prepend(
          "#view-log-body",
          `<ul class="view-log-body-item">
            <li class="no">${len - i}</li>
            <li class="date">${val.date}</li>
            <li class="event">${val.event}</li>
            <li class="value">${val.value}</li>
          </ul>`
        )
      });
    }
  }

  // load page
  useReferences.ajax.get(
    "/get-view-log",
    (res) => {
      /* res: {
        date: string;
        event: string;
        value: string;
      }[] */
      logsRes = res;
      setLogs(res);
    },
    (statusCode, errText) => {
      setAlertErr(`${statusCode}: ${errText}`);
    },
    () => {
      useReferences.effect.hide("#loading");
    }
  );

  // refresh logs list
  const timeout = 3000;

  const logsInterval = setInterval(() => {
    const thisContent = document.getElementById("view-log-body");
    if (thisContent) {
      useReferences.ajax.get(
        "/get-view-log",
        (res) => {
          if (res !== logsRes) {
            logsRes = res;
            setLogs(res);
          }
        },
        () => { },
        () => { },
        timeout
      );
    } else {
      clearInterval(logsInterval);
    }
  }, timeout);
}