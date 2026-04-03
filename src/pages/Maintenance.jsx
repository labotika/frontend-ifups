import { useState, useEffect } from "react";

const COUNTDOWN_SECONDS = 300;

const Maintenance = () => {
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="max-w-md mx-auto text-center text-white animate-fadeIn">
        <div className="mb-8">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <span className="text-2xl font-bold text-primary">UPS</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2">🚧 Maintenance Mode</h1>
        <div className="w-16 h-1 bg-secondary mx-auto mb-6 rounded-full" />

        <p className="text-lg text-gray-200 leading-relaxed mb-4">
          We are upgrading our system to serve you better. Please check back later.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-secondary text-primary font-bold rounded-full hover:bg-secondary/80 transition"
        >
          Refresh Now
        </button>

        <div className="mt-8 text-sm text-gray-400">
          <p>Program Studi Informatika</p>
          <p>Universitas Pancasakti Tegal</p>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
