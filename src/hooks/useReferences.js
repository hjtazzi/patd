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
  }
};