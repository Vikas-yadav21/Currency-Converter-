

import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency, targetCurrency) {
    const [rate, setRate] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                // Fetch the conversion rates for the base currency
                const response = await fetch(`https://v6.exchangerate-api.com/v6/cbde0c4b61d324b77c102673/latest/${baseCurrency}`);
                const result = await response.json();
                
                if (result && result.conversion_rates) {
                    // Set the rate for the target currency
                    const conversionRate = result.conversion_rates[targetCurrency];
                    setRate(conversionRate);
                } else {
                    console.error("Unexpected data format", result);
                    setError("Failed to retrieve conversion rates.");
                }
            } catch (error) {
                console.error("Error fetching currency data:", error);
                setError("Error fetching currency data.");
            }
        };

        if (baseCurrency && targetCurrency) {
            fetchCurrencyData();
        }
    }, [baseCurrency, targetCurrency]);
    console.log(rate)

    return { rate, error };
}

export default useCurrencyInfo;
