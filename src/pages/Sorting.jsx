// src/pages/Sorting.jsx
import React, { useState } from "react";
import Sorting from "../components/Sorting";

export default function SortingPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort"); // example default

  return (
    <div className="theme-container">
      <h1 className="theme-title">Sorting Algorithms</h1>

      <Sorting onAlgorithmChange={setSelectedAlgorithm} />
    </div>
  );
}
