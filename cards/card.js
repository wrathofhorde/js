window.onload = () => {
  const container = document.querySelector(".container");
  const overlay = document.querySelector(".overlay");
  container.addEventListener("mousemove", function (e) {
    const x = e.offsetX;
    const y = e.offsetY;
    const rotateY = (-1 / 5) * x + 20;
    const rotateX = (4 / 30) * y - 20;

    overlay.style = `background-position : ${
      x / 5 + y / 5
    }%; filter : opacity(${x / 200}) brightness(1.2)`;

    container.style = `transform : perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  container.addEventListener("mouseout", () => {
    overlay.style = "filter : opacity(0)";
    container.style =
      "transform : perspective(350px) rotateY(0deg) rotateX(0deg)";
  });
};
