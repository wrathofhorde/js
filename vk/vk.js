const DIV_HIDE = "none";
const DIV_SHOW = "block";

window.onload = () => {
  const wrapper = document.getElementById("wrapper");
  wrapper.style.display = DIV_HIDE;
  wrapper.addEventListener("click", () => {
    wrapper.style.display = DIV_HIDE;
  });

  const afterNumber = document.getElementById("after-number");
  afterNumber.addEventListener("click", () => {
    wrapper.style.display = DIV_SHOW;
  });
};
