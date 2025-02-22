import { useState, useEffect } from "react";

const Loading = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-gray-600 text-lg font-medium">
      Typing<span className="animate-pulse">{dots}</span>
    </span>
  );
};

export default Loading;
