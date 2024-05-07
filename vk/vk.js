window.onload = () => {
  const afterNumber = document.getElementsByClassName("after-number")[0];
  console.log(afterNumber);

  afterNumber.addEventListener("click", () => {
    console.log("hello");
  });

  const wrapper = document.getElementsByClassName("wrapper")[0];
  console.log(wrapper);
};
