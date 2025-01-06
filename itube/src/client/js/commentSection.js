const form = document.getElementById("commentForm");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  console.log(videoComments);
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.setAttribute("data-id", id);
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const markX = document.createElement("span");
  markX.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(markX);
  console.log(newComment);
  videoComments.prepend(newComment);
};

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

    textarea.value = "";

    if (response.status != 201) {
      console.log("fetch error");
      return;
    }

    const { newCommentId } = await response.json();
    // window.location.reload();
    addComment(text, newCommentId);
  });
}
