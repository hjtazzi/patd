import { useRender } from "../../../hooks";
import menuItems from "../contents/menuItems";

export default NavMenu = () => {
  useRender.append(".aside-content .nav-menu", `<ul class="list-menu" id="list-menu"></ul>`);

  menuItems.map((val, i) => {
    // val: {title, submenu: {title, content}[]}

    var newItemMenu = `<li class="item-menu i-m-${i}">`;
    if (val.submenu.length > 1) {
      newItemMenu += `<button class="btn item-menu-btn" data-expanded="true">${val.title}</button>`;
      newItemMenu += `<div class="list-submenu-cont">`;
      newItemMenu += `<ul class="list-submenu">`;
      val.submenu.map((v, j) => {
        newItemMenu += `<li class="item-submenu i-sm-${j}">`;
        newItemMenu += `<a href="#${v.content}" class="btn item-submenu-btn" data-content="${v.content}" data-toggle="item-content">${v.title}</a>`;
        newItemMenu += `</li>`;
      });
      newItemMenu += `</ul>`
      newItemMenu += `</div>`;
    } else {
      var v = val.submenu[0];
      newItemMenu += `<a href="#${v.content}" class="btn item-menu-btn" data-content="${v.content}" data-toggle="item-content">${v.title}</a>`;
    }
    newItemMenu += `</li>`;

    useRender.append("#list-menu", newItemMenu);
  });
}