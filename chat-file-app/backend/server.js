const pool = new Pool({
  user: "youruser",
  host: "postgres", // 컨테이너 이름으로 호스트 지정
  database: "chatapp",
  password: "yourpassword",
  port: 5432,
});
