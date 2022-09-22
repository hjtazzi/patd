import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Main from "./components/main/Main";

export default App = function () {
  if (sessionStorage.getItem("login") === "true") {
    Header();
    Main();
  } else {
    Login();
  }
}