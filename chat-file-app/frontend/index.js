const socket = io("http://backend:4000"); // 백엔드 컨테이너 이름 사용
// ...
axios.get("http://backend:4000/messages").then((res) => {
  setMessages(res.data);
});
