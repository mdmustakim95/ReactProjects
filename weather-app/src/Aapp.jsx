import React, { useState, useEffect } from "react";

// Single-file React component: Weather UI Template
// Requirements: TailwindCSS, recharts, framer-motion (optional), lucide-react (optional)
// Replace mock data and `fetchWeather` with your preferred weather API integration.

export default function WeatherApp() {
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock state for UI showcasing
  const [current, setCurrent] = useState({
    city: "Mumbai",
    country: "IN",
    temp: 30,
    feels_like: 31,
    condition: "Mostly Sunny",
    humidity: 68,
    wind_kph: 12,
    sunrise: "06:15",
    sunset: "18:37",
    updated: "Oct 1, 2025 20:10",
    icon: "☀️",
  });

  const hourly = [
    { time: "21:00", temp: 30 },
    { time: "22:00", temp: 29 },
    { time: "23:00", temp: 28 },
    { time: "00:00", temp: 27 },
    { time: "01:00", temp: 27 },
    { time: "02:00", temp: 26 },
  ];

  const forecast = [
    { day: "Thu", high: 33, low: 26, cond: "Sunny", icon: "☀️" },
    { day: "Fri", high: 31, low: 25, cond: "Clouds", icon: "⛅" },
    { day: "Sat", high: 29, low: 24, cond: "Rain", icon: "🌧️" },
    { day: "Sun", high: 30, low: 24, cond: "Partly", icon: "🌤️" },
    { day: "Mon", high: 32, low: 25, cond: "Sunny", icon: "☀️" },
  ];

  // Example: stub for real API call. Replace with fetch/axios to OpenWeatherMap, WeatherAPI, etc.
  async function fetchWeather(location) {
    setLoading(true);
    setError(null);
    try {
      // TODO: implement actual request
      await new Promise((r) => setTimeout(r, 700)); // simulate latency
      // Update UI with mocked values for now
      setCurrent((c) => ({ ...c, city: location || c.city }));
    } catch (e) {
      setError("Unable to fetch weather");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // initial load
    fetchWeather();
  }, []);

  function onSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    fetchWeather(query.trim());
    setQuery("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 p-6">
      <div className="max-w-5xl mx-auto grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Search + Current */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow p-5">
          <form onSubmit={onSearch} className="flex gap-3 mb-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city, e.g. Chennai"
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-200"
              aria-label="Search city"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="text-6xl" aria-hidden>
              {current.icon}
            </div>
            <div>
              <div className="text-lg font-semibold">{current.city}, {current.country}</div>
              <div className="text-4xl font-bold mt-1">{current.temp}°</div>
              <div className="text-sm text-slate-500">{current.condition}</div>
              <div className="text-xs text-slate-400 mt-1">Updated: {current.updated}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <div className="font-medium">Feels</div>
              <div className="text-lg">{current.feels_like}°</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <div className="font-medium">Humidity</div>
              <div className="text-lg">{current.humidity}%</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <div className="font-medium">Wind</div>
              <div className="text-lg">{current.wind_kph} kph</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <div>Units</div>
            <div className="flex gap-2">
              <button
                onClick={() => setUnit("metric")}
                className={`px-2 py-1 rounded ${unit === "metric" ? "bg-sky-600 text-white" : "bg-slate-100"}`}
              >
                °C
              </button>
              <button
                onClick={() => setUnit("imperial")}
                className={`px-2 py-1 rounded ${unit === "imperial" ? "bg-sky-600 text-white" : "bg-slate-100"}`}
              >
                °F
              </button>
            </div>
          </div>
        </div>

        {/* Hourly + Forecast (center) */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">Hourly</div>
            <div className="text-xs text-slate-500">Next 12 hrs</div>
          </div>

          {/* Placeholder chart area - replace with Recharts/Chart.js */}
          <div className="w-full h-40 rounded-lg bg-gradient-to-b from-white to-slate-50 flex items-center justify-center text-slate-400">
            Chart placeholder (use Recharts AreaChart here)
          </div>

          <div className="mt-4 grid grid-cols-5 gap-3">
            {forecast.map((f) => (
              <div key={f.day} className="text-center p-2 bg-slate-50 rounded-lg">
                <div className="font-medium">{f.day}</div>
                <div className="text-sm" aria-hidden>{f.icon}</div>
                <div className="mt-2 text-sm font-semibold">{f.high}°/{f.low}°</div>
              </div>
            ))}
          </div>
        </div>

        {/* Details + Saved locations (right) */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow p-5">
          <div className="font-semibold mb-3">Details</div>
          <ul className="text-sm space-y-2 text-slate-700">
            <li className="flex justify-between">
              <span>Sunrise</span>
              <span>{current.sunrise}</span>
            </li>
            <li className="flex justify-between">
              <span>Sunset</span>
              <span>{current.sunset}</span>
            </li>
            <li className="flex justify-between">
              <span>Visibility</span>
              <span>10 km</span>
            </li>
            <li className="flex justify-between">
              <span>Pressure</span>
              <span>1013 hPa</span>
            </li>
          </ul>

          <div className="mt-6">
            <div className="font-semibold mb-2">Saved Locations</div>
            <div className="flex flex-col gap-2">
              <button className="text-left p-2 rounded-lg bg-slate-50" onClick={() => fetchWeather('Mumbai')}>Mumbai</button>
              <button className="text-left p-2 rounded-lg bg-slate-50" onClick={() => fetchWeather('Bengaluru')}>Bengaluru</button>
              <button className="text-left p-2 rounded-lg bg-slate-50" onClick={() => fetchWeather('Delhi')}>Delhi</button>
            </div>
          </div>

          {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 text-center text-xs text-slate-400">
        UI Template — swap mock data with real API calls. For a production build wire up error handling, caching, and accessibility improvements.
      </div>
    </div>
  );
}
