const results = [
  {
    date: "2025-01-12 18:19:20",
    type: "매수",
    coin: "ETH",
    quantity: "0.5ETH",
    price: "0.14BTC",
    amount: "0.07BTC",
    charge: "0.00014BTC",
    total: "0.07014BTC",
  },
  {
    date: "2025-01-11 06:01:20",
    type: "매도",
    coin: "ETH",
    quantity: "0.1ETH",
    price: "0.01BTC",
    amount: "0.001BTC",
    charge: "0.00014BTC",
    total: "0.00114BTC",
  },
  {
    date: "2024-12-31 08:37:20",
    type: "매수",
    coin: "ETH",
    quantity: "0.1ETH",
    price: "0.04BTC",
    amount: "0.011BTC",
    charge: "0.00014BTC",
    total: "0.00014BTC",
  },
  {
    date: "2024-12-29 18:19:20",
    type: "매도",
    coin: "ETH",
    quantity: "0.5ETH",
    price: "0.14BTC",
    amount: "0.07BTC",
    charge: "0.00014BTC",
    total: "0.07014BTC",
  },
  {
    date: "2024-11-12 18:19:20",
    type: "매수",
    coin: "ETH",
    quantity: "0.5ETH",
    price: "0.14BTC",
    amount: "0.07BTC",
    charge: "0.00014BTC",
    total: "0.07014BTC",
  },
  {
    date: "2024-10-12 18:19:20",
    type: "매도",
    coin: "ETH",
    quantity: "0.5ETH",
    price: "0.14BTC",
    amount: "0.07BTC",
    charge: "0.00014BTC",
    total: "0.07014BTC",
  },
  {
    date: "2024-09-12 18:19:20",
    type: "매수",
    coin: "ETH",
    quantity: "0.5ETH",
    price: "0.14BTC",
    amount: "0.07BTC",
    charge: "0.00014BTC",
    total: "0.07014BTC",
  },
  {
    date: "2024-08-12 18:19:20",
    type: "매도",
    coin: "ETH",
    quantity: "0.5ETH",
    price: "0.14BTC",
    amount: "0.07BTC",
    charge: "0.00014BTC",
    total: "0.07014BTC",
  },
  {
    date: "2024-07-12 18:19:20",
    type: "매수",
    coin: "ETH",
    quantity: "0.5ETH",
    price: "0.14BTC",
    amount: "0.07BTC",
    charge: "0.00014BTC",
    total: "0.07014BTC",
  },
  {
    date: "2024-06-12 18:19:20",
    type: "매도",
    coin: "ETH",
    quantity: "0.5ETH",
    price: "0.14BTC",
    amount: "0.07BTC",
    charge: "0.00014BTC",
    total: "0.07014BTC",
  },
];

const onLoadEventListener = (event) => {
  const fixedTable = document.querySelector(".fixed table tbody");
  const scrollTable = document.querySelector(".scroll table tbody");

  for (let i = 0; i < results.length; ++i) {
    const fixedTr = document.createElement("tr");
    const scrollTr = document.createElement("tr");

    fixedTable.appendChild(fixedTr);
    scrollTable.appendChild(scrollTr);

    const dateTd = document.createElement("td");
    const typeTd = document.createElement("td");

    fixedTr.appendChild(dateTd);
    fixedTr.appendChild(typeTd);

    dateTd.innerText = results[i].date;
    typeTd.innerText = results[i].type;

    let className = typeTd.className;
    let addedClassName = typeTd.innerText === "매수" ? "buy" : "sell";
    typeTd.className += (className.length === 0 ? "" : " ") + addedClassName;

    const coinTd = document.createElement("td");
    const quantityTd = document.createElement("td");
    const priceTd = document.createElement("td");
    const amountTd = document.createElement("td");
    const chargeTd = document.createElement("td");
    const totalTd = document.createElement("td");

    scrollTr.appendChild(coinTd);
    scrollTr.appendChild(quantityTd);
    scrollTr.appendChild(priceTd);
    scrollTr.appendChild(amountTd);
    scrollTr.appendChild(chargeTd);
    scrollTr.appendChild(totalTd);

    coinTd.innerText = results[i].coin;
    quantityTd.innerText = results[i].quantity;
    priceTd.innerText = results[i].price;
    amountTd.innerText = results[i].amount;
    chargeTd.innerText = results[i].charge;
    totalTd.innerText = results[i].total;

    coinTd.style.textAlign = "center";
    coinTd.style.paddingRight = "0px";
  }
};

window.addEventListener("load", onLoadEventListener);
