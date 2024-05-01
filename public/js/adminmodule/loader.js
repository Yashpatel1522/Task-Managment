document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector(
      ".rightbar").style.visibility = "hidden";
    document.querySelector(
      "#loader").style.visibility = "visible";
  } else {
    document.querySelector(
      "#loader").style.display = "none";
    document.querySelector(
      ".rightbar").style.visibility = "visible";
  }
};