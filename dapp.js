const ssAddress = "0xce81d874112bbad873974d99e6f8cd595865c974";

const ssABI = [
  {
    inputs: [],
    name: "retrieve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.addEventListener("load", function () {
  if (typeof window.ethereum !== "undefined") {
    let mmDetected = document.getElementById("mm-detected");
    mmDetected.innerHTML = "MetaMask detcted!";
  } else {
    console.log("MetaMask Not Available!");
    alert("Please install MetaMask or another wallet!");
  }
});

const mmEnable = document.getElementById("mm-connect");
mmEnable.onclick = async () => {
  await ethereum.request({
    method: "eth_requestAccounts",
  });
  const mmCurrentAccount = document.getElementById("mm-current-account");
  console.log(ethereum.selectedAddress);
  mmCurrentAccount.innerHTML = `Here's your current account ${ethereum.selectedAddress}`;
};

// Initialize web3 and contract
web3 = new Web3(window.ethereum);
const simpleStorage = new web3.eth.Contract(ssABI, ssAddress);

const ssSubmit = document.getElementById("ss-input-button");
ssSubmit.onclick = async () => {
  const ssValue = document.getElementById("ss-input-box").value;
  console.log(ssValue);

  await simpleStorage.methods.store(ssValue).send({ from: ethereum.selectedAddress });
};

const ssGetValue = document.getElementById("ss-get-value");

ssGetValue.onclick = async () => {
  let displayValue = document.getElementById("ss-display-value");
  const value = await simpleStorage.methods.retrieve().call();

  displayValue.innerHTML = value;
};
