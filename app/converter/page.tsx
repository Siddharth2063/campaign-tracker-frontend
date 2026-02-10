"use client";

import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ConverterPage() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("INR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState<any>(null);

  async function convert() {
    const res = await fetch(
      `${BASE_URL}/tools/convert-currency/?amount=${amount}&from=${from}&to=${to}`
    );
    const data = await res.json();
    setResult(data);
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">Currency Converter</h1>

      <div className="mt-6 flex gap-4 items-end">
        <input
          className="border p-2"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <button
          onClick={convert}
          className="bg-black text-white px-4 py-2"
        >
          Convert
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 border rounded">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
