const getMardedAddress = (address) => {
  if (address.length === 0) return "";

  const mark = "*";

  const words = address.split(" ");
  if (words.length === 1) {
    const addr = words[0];
    const displayPart = Math.floor(addr.length / 2);

    return `${addr.substring(0, displayPart)}${mark.repeat(
      addr.length - displayPart
    )}`;
  }

  let markedLength = 0;
  for (let i = 1; i < words.length; ++i) {
    markedLength += words[i].length + 1 /* for space */;
  }

  return `${words[0]}${mark.repeat(markedLength)}`;
};

const addr1 = "(12345)서울시 강서구 양천로 123";
const addr2 = "(12345)서울시강서구양천로123";
const addr3 = "";
const addr4 = "(12345)서울시 강서구 양천로 123, 양천향교 사거리";

console.log(getMardedAddress(addr1));
console.log(getMardedAddress(addr2));
console.log(getMardedAddress(addr3));
console.log(getMardedAddress(addr4));
