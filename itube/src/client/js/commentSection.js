const dataId = "data-id";
const form = document.getElementById("commentForm");
const marks = document.getElementsByClassName("mark");
const videoContainer = document.getElementById("videoContainer");

const markOnClickHandler = async (event) => {
  const videoId = videoContainer.dataset.id;
  const parent = event.target.parentElement;
  const commentId = parent.getAttribute(dataId);

  const response = await fetch(`/api/comments/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      videoId,
      commentId,
    }),
  });

  if (response.status !== 201) {
    console.log("error");
    return;
  }

  const grandParent = parent.parentElement;
  grandParent.removeChild(parent);
};

for (const mark of marks) {
  //   console.log(mark);
  mark.addEventListener("click", markOnClickHandler);
}

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.setAttribute(dataId, id);
  //   console.log(videoComments);
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";

  const span = document.createElement("span");
  span.innerText = ` ${text}`;

  const markX = document.createElement("span");
  markX.innerText = " ❌";
  markX.className = "mark";
  markX.addEventListener("click", markOnClickHandler);

  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(markX);
  //   console.log(newComment);
  videoComments.prepend(newComment);
};

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const textarea = form.querySelector("textarea");
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
    addComment(text, newCommentId);
  });
}
