let currentAccount = null;

const connectWallet = async () => {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask가 설치되어 있지 않습니다. 설치 후 새로고침하세요.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    currentAccount = accounts[0];
    document.getElementById(
      "account"
    ).innerText = `연결된 계정: ${currentAccount}`;
    document.getElementById("signButton").disabled = false;

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    updateNetwork(chainId);

    console.log("지갑 연결 성공:", currentAccount);
  } catch (error) {
    console.error("연결 실패:", error);
    alert("지갑 연결 실패: " + error.message);
  }
};

// 네트워크 정보 업데이트
const updateNetwork = (chainId) => {
  const networkNames = {
    "0x1": "Ethereum Mainnet",
    "0x3": "Ropsten Testnet",
    "0x4": "Rinkeby Testnet",
    "0x5": "Goerli Testnet",
    "0x89": "Polygon Mainnet",
  };

  const networkName =
    networkNames[chainId] || `알 수 없는 네트워크 (Chain ID: ${chainId})`;
  document.getElementById("network").innerText = `네트워크: ${networkName}`;
};

// 메시지 서명 함수
const signMessage = async () => {
  if (!currentAccount) {
    alert("먼저 지갑을 연결하세요.");
    return;
  }

  const startTime = Date.now();
  const message = `프라뱅 메타마스크 지갑 등록: ${currentAccount}, \nTime: ${startTime}`;

  try {
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [message, currentAccount],
    });

    const endTime = Date.now();

    const data = {
      address: currentAccount,
      message,
      // message: "hello",
      signature,
    };

    if ((endTime - startTime) / 1000 <= 60) {
      const response = await fetch("/verify/account", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      const { isValid } = result;

      if (isValid) {
        document.getElementById("signature").innerText = `지갑 등록 성공`;
      } else {
        document.getElementById("signature").innerText = `지갑 등록 실패`;
      }
    } else {
      console.log("서명 시간이 초과하였습니다.");
    }
  } catch (error) {
    console.error("서명 실패:", error);
    alert("서명 실패: " + error.message);
  }
};

window.ethereum.on("accountsChanged", (accounts) => {
  currentAccount = accounts[0] || null;
  document.getElementById("account").innerText = `연결된 계정: ${
    currentAccount || "없음"
  }`;
  document.getElementById("signButton").disabled = !currentAccount;
});

window.ethereum.on("chainChanged", (chainId) => {
  updateNetwork(chainId);
});
