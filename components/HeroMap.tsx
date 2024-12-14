"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

// Enregistrer les éléments de Chart.js
Chart.register(...registerables);

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function HeroMap() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [candidatesData, setCandidatesData] = useState([]);

  useEffect(() => {
    const loadDistrictData = async () => {
      const response = await fetch("/result/result.json");
      const data = await response.json();
    };

    loadDistrictData();
  }, []);

  const handleDistrictHover = (districtName, data) => {
    setSelectedDistrict(districtName);
    setCandidatesData(data);
  };

  const chartData = {
    labels: candidatesData.map(candidate => candidate.name),
    datasets: [
      {
        data: candidatesData.map(candidate => candidate.percentage),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <section id="HeroMap">
      <div className="bg-[url('/img/font.png')] bg-cover bg-center min-h-screen flex flex-col">
        <div className="mx-4 md:mx-24 mt-24 text-black rounded-lg">
          <div className="bg-[#ffffff16] text-black rounded-lg flex flex-col md:flex-row gap-2">
            <div className="flex-1 bg-[#ffffff16] rounded-md p-4">
              <div className="w-full h-[600px]">
                <Map onDistrictHover={handleDistrictHover} />
              </div>
            </div>
            <div className="flex-1 bg-[#dedb329a] rounded-md p-4">
              {selectedDistrict && (
                <>
                  <h2 className="text-white-50">{selectedDistrict}</h2>
                  <h3 className="text-white-50">Candidats et pourcentages</h3>
                  <ul>
                    {candidatesData.map((candidate) => (
                      <li key={candidate.name} className="text-white-50">
                        {candidate.name}: {candidate.percentage}%
                      </li>
                    ))}
                  </ul>
                  <Doughnut data={chartData} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}