import $ from "jquery";

export default useRender = {
  append: (selector, content) => {
    $(selector).append(content.toString());
  },
  prepend: (selector, content) => {
    $(selector).prepend(content.toString());
  },
  after: (selector, content) => {
    $(selector).after(content.toString());
  },
  before: (selector, content) => {
    $(selector).before(content.toString());
  },
  html: (selector, content) => {
    $(selector).html(content.toString());
  },
  text: (selector, content) => {
    $(selector).text(content.toString());
  }
}