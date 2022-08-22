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
    },
    innerWidth: (selector) => {
      return $(selector).innerWidth();
    },
    innerHeight: (selector) => {
      return $(selector).innerHeight();
    }
  },
  traversing: {
    prev: (selector, filter) => {
      return $(selector).prev(filter);
    },
    prevAll: (selector, filter) => {
      return $(selector).prevAll(filter);
    },
    next: (selector, filter) => {
      return $(selector).next(filter);
    },
    nextAll: (selector, filter) => {
      return $(selector).nextAll(filter);
    }
  },
  effect: {
    hide: (selector) => {
      $(selector).hide();
    },
    show: (selector) => {
      $(selector).show();
    },
    slideToggle: (selector, completed) => {
      $(selector).slideToggle(350, "swing", () => {
        completed();
      });
    }
  },
  window: {
    width: () => {
      return $(window).width();
    }
  }
};