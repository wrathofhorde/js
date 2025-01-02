const form = document.getElementById("commentForm");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const textarea = form.querySelector("textarea");
    const videoContainer = document.getElementById("videoContainer");

    const text = textarea.value;
    const videoId = videoContainer.dataset.id;

    if (text === "") {
      return;
    }

    const response = await fetch(`/api/videos/${videoId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    });

    if (response.status != 200) {
      console.log("fetch error");
      return;
    }
  });
}
