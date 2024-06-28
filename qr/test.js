document.write('<script type="text/javascript" src="qrcode.js"></script>');

window.onload = () => {
  const userId = "jason@pravang.com";
  const site = "Pravang";
  const secret = "LERWRRNUJNONOUV7";
  const content = `otpauth://totp/${userId} ${site}?secret=${secret}`;
  const qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 100,
    height: 100,
  });

  const makeCode = (txt) => {
    if (!txt) {
      alert("input text");
      return;
    }
    qrcode.makeCode(txt);
  };

  makeCode(content);
};
