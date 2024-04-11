// const showDetails = () => {
//   // alert("hello");
//   window.open("", "", "popup=yes");
// }

function popupFn() {
  // console.log(id);
  document.getElementById('overlay').
      style.display = 'block';
  document.getElementById('popupDialog').
      style.display = 'block';
}
function closeFn() {
  document.getElementById('overlay').
      style.display = 'none';
  document.getElementById('popupDialog').
      style.display = 'none';
}