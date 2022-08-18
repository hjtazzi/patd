import $ from "jquery";

export default useEvent = {
  click: (selector, action) => {
    $(selector).click((e) => {
      action(e);
    });
  },
  dblclick: (selector, action) => {
    $(selector).dblclick((e) => {
      action(e);
    });
  },
  mouseenter: (selector, action) => {
    $(selector).mouseenter((e) => {
      action(e);
    });
  },
  mouseleave: (selector, action) => {
    $(selector).mouseleave((e) => {
      action(e);
    });
  },
  mousedown: (selector, action) => {
    $(selector).mousedown((e) => {
      action(e);
    });
  },
  mouseup: (selector, action) => {
    $(selector).mouseup((e) => {
      action(e);
    });
  },
  hover: (selector, action) => {
    $(selector).hover((e) => {
      action(e);
    });
  },
  focus: (selector, action) => {
    $(selector).focus((e) => {
      action(e);
    });
  },
  blur: (selector, action) => {
    $(selector).blur((e) => {
      action(e);
    });
  },
  on: (selector, event, action) => {
    $(selector).on(
      event,
      action(e)
    );
  }
}