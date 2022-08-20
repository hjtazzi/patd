import $ from "jquery";

export default useReferences = {
  attr: {
    get: (selector, attribute) => {
      return $(selector).attr(attribute);
    },
    set: (selector, attribute, value) => {
      $(selector).attr(attribute, value);
    },
    setFn: (selector, attribute, action) => {
      $(selector).attr(
        attribute,
        (index, currentValue) => {
          action(index, currentValue);
        }
      );
    },
    remove: (selector, attribute) => {
      $(selector).removeAttr(attribute);
    }
  },
  class: {
    add: (selector, value) => {
      $(selector).addClass(value);
    },
    remove: (selector, value) => {
      $(selector).removeClass(value);
    },
    toggle: (selector, value) => {
      $(selector).toggleClass(value);
    }
  },
  css: {
    get: (selector, property) => {
      $(selector).css(property);
    },
    set: (selector, property, value) => {
      $(selector).css(property, value);
    },
    setObj: (selector, multipleProperties) => {
      $(selector).css(multipleProperties);
    }
  },
  window: {
    width: () => {
      return $(window).width();
    }
  }
};