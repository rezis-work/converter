// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [toGet, setToGet] = useState("EUR");
  const [toConvert, setToConvert] = useState("USD");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convertator() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${toGet}&to=${toConvert}`
        );
        const data = await res.json();
        console.log(data.rates[toConvert]);
        setOutput(data.rates[toConvert]);
        setIsLoading(false);
      }
      if (toGet === toConvert) {
        setOutput(1);
        return;
      }
      convertator();
    },
    [amount, toGet, toConvert]
  );

  function handleAmount(e) {
    const input = e.target.value;
    if (isNaN(input)) return;
    else {
      setAmount(Number(input));
    }
  }

  function handleGet(e) {
    setToGet(e.target.value);
  }

  function handleConvert(e) {
    setToConvert(e.target.value);
  }

  return (
    <div className="main">
      <div className="header">
        <img src="./khazi-logo.png" alt="our Logo" className="logo" />
        <h1 style={{ marginTop: "30px", color: "#fab005" }}>
          LineDevLTD currency check
        </h1>
      </div>
      <input
        type="text"
        className="main-input"
        placeholder="Put Your Amount"
        onChange={handleAmount}
        value={amount}
        disabled={isLoading}
      />
      <select className="toget" value={toGet} onChange={handleGet}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select className="toconvert" value={toConvert} onChange={handleConvert}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p className="output">
        {!isLoading && `${output} ${toConvert}`}
        {isLoading && "Loading..."}
      </p>

      <footer>
        <p>&copy; LineDevLTD | Creator _Rezi Karanadze_</p>
        <div className="images">
          <a href="https://github.com/rezis-work">
            <img src="./git.png" alt="github" />
          </a>
          <a href="https://www.instagram.com/linedevltd/">
            <img src="./insta.png" alt="instagram" />
          </a>
        </div>
      </footer>
    </div>
  );
}
