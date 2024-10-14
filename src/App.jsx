


import React, { useState } from "react";
import InputBox from './components/InputBox';  // Your InputBox component
import useCurrencyInfo from './hooks/useCurrencyInfo';  // Your updated hook

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { rate, error } = useCurrencyInfo(from, to);  // Use the hook to get the rate

  const swap = () => {
    setFrom(to);
    setTo(from);
    convert();
  };

  const convert = () => {
    if (rate) {
      setConvertedAmount(amount * rate);  // Use the rate to convert the amount
    } else {
      console.error("Conversion rate not available");
    }
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat contrast"
         style={{ backgroundImage: "url('rupee.jpg')"  }}>
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        
        {error ? (
          <p className="text-red-500 text-center mb-4">{error}</p>
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}>
            <InputBox
              label="From"
              amount={amount}
              const currencyOptions = {[
                "AUD",
                "BGN",
                "BRL",
                "CAD",
                "CHF",
                "CNY",
                "CZK",
                "DKK",
                "EUR",
                "GBP",
                "HKD",
                "HRK",
                "HUF",
                "IDR",
                "ILS",
                "INR",
                "JPY",
                "KRW",
                "MXN",
                "MYR",
                "NOK",
                "NZD",
                "PHP",
                "PLN",
                "RON",
                "RUB",
                "SEK",
                "SGD",
                "THB",
                "TRY",
                "USD",
                "ZAR"
            ]}
            
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />

            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              onClick={swap}
            >
              Swap
            </button>

            <InputBox
              label="To"
              amount={convertedAmount}
              const currencyOptions ={ [
                "AUD",
                "BGN",
                "BRL",
                "CAD",
                "CHF",
                "CNY",
                "CZK",
                "DKK",
                "EUR",
                "GBP",
                "HKD",
                "HRK",
                "HUF",
                "IDR",
                "ILS",
                "INR",
                "JPY",
                "KRW",
                "MXN",
                "MYR",
                "NOK",
                "NZD",
                "PHP",
                "PLN",
                "RON",
                "RUB",
                "SEK",
                "SGD",
                "THB",
                "TRY",
                "USD",
                "ZAR"
            ]}
            
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              
              amountDisable
            />

            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
