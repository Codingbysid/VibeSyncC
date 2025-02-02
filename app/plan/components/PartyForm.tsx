"use client";

import { useState } from "react";

export default function PartyForm() {
  const [guestSize, setGuestSize] = useState("");
  const [partyType, setPartyType] = useState("Birthday");
  const [location, setLocation] = useState("");
  const [under21, setUnder21] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(guestSize, 10) <= 0) {
      setError("Guest size must be greater than zero.");
      return;
    }
    if (!location.trim()) {
      setError("Location is required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/party-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestSize: parseInt(guestSize, 10),
          partyType,
          under21,
          location,
        }),
      });

      const data = await res.json();
      if (!res.ok) setError(data.error || "Failed to fetch the party plan.");
      else setResponse(data.plan || "No plan generated.");
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Plan Your Party 🎈
      </h2>
      <form onSubmit={handlePlanSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Guest Size
          </label>
          <input
            type="number"
            value={guestSize}
            onChange={(e) => setGuestSize(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Party Type
          </label>
          <select
            value={partyType}
            onChange={(e) => setPartyType(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
          >
            <option>Birthday</option>
            <option>Wedding</option>
            <option>Corporate</option>
            <option>House Party</option>
            <option>Anniversary</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
            required
          />
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={under21}
            onChange={(e) => setUnder21(e.target.checked)}
            className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-400 rounded"
          />
          <label className="text-sm font-medium text-gray-600">
            Is this an under-21 event?
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-4 py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform"
        >
          {loading ? "Generating..." : "Generate Plan"}
        </button>
      </form>
      {error && (
        <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      {response && (
        <div className="mt-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
          <p className="font-bold">Party Plan:</p>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
