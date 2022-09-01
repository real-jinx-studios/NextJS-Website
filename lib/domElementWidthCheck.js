import customLog from "../components/utils/customLog";

var docWidth = document.documentElement.offsetWidth;

[].forEach.call(document.querySelectorAll("*"), function (el) {
  if (el.offsetWidth > docWidth) {
    customLog([el]);
  }
});
