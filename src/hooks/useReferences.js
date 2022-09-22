import $ from "jquery";
import queryString from "query-string";

const baseURL = ".";

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
  },
  forms: {
    serialize: (selector) => {
      return $(selector).serialize();
    },
    serializeArray: (selector) => {
      return $(selector).serializeArray();
    },
    qsParse: (value) => {
      return queryString.parse(value);
    },
    qsStringify: (valueObj) => {
      return queryString.stringify(valueObj);
    },
    blockSpecial: (selector) => {
      $(selector).bind(
        'input',
        function () {
          let c = this.selectionStart;
          const r = /[^a-zA-Z0-9.]/gi;
          const v = $(this).val();

          if (r.test(v)) {
            $(this).val(v.replace(r, ''));
            c--;
          }
          this.setSelectionRange(c, c);
        }
      );
    }
  },
  ajax: {
    post: (url, data, success, error, complete, timeout = 10000) => {
      /*
      url: string;
      data: string;
      success: (res: any) => {};
      error: (status: number; text: string) => {};
      complete: (xhr: any) => {}
      */
      $.ajax({
        type: "POST",
        url: baseURL + url,
        data: data,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (result) {
          success(result);
        },
        error: function (xhr) {
          error(xhr.status, xhr.statusText);
        },
        complete: function (xhr) {
          complete(xhr);
        },
        timeout: timeout
      });
    },
    get: (url, success, error, complete, timeout = 10000) => {
      /*
      url: string;
      success: (res: any) => {};
      error: (status: number; text: string) => {};
      complete: (xhr: any) => {}
      */
      $.ajax({
        type: "GET",
        url: baseURL + url,
        success: function (result) {
          success(result);
        },
        error: function (xhr) {
          error(xhr.status, xhr.statusText);
        },
        complete: function (xhr) {
          complete(xhr);
        },
        timeout: timeout
      });
    }
  }
};