const DIV_HIDE = "none";
const DIV_SHOW = "block";

window.onload = () => {
  const wrapper = document.getElementById("wrapper");
  const afterNumber = document.getElementById("after-number");

  wrapper.style.display = DIV_HIDE;

  afterNumber.addEventListener("click", () => {
    wrapper.style.display = DIV_SHOW;
  });

  wrapper.addEventListener("click", () => {
    wrapper.style.display = DIV_HIDE;
  });
};
