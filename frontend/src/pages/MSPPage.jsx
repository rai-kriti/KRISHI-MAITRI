import { useEffect, useState } from "react";
import axios from "axios";

import MSPHeader from "../components/msp/MSPHeader";
import SeasonSwitch from "../components/msp/SeasonSwitch";
import HeroMSPCarousel from "../components/msp/HeroMSPCarousel";
import TopCropsBarChart from "../components/msp/TopCropsBarChart";
import CropList from "../components/msp/CropList";
import CropTrendDrawer from "../components/msp/CropTrendDrawer";

export default function MSPPage() {
  const [season, setSeason] = useState("kharif");
  const [data, setData] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/msp/widget")
      .then(res => setData(res.data.data));
  }, []);

  useEffect(() => {
    if (!selectedCrop) return;

    axios
      .get(`http://localhost:5000/api/msp/${selectedCrop.season}/${selectedCrop.crop}`)
      .then(res => setTrend(res.data.data));
  }, [selectedCrop]);

  const filtered = data
    .filter(d => d.season === season)
    .sort((a, b) => b.msp - a.msp);

  return (
    <div className="bg-[#FFF7E6] min-h-screen p-5">
      
      <MSPHeader />
      <SeasonSwitch season={season} setSeason={setSeason} />

      <HeroMSPCarousel data={filtered} />


      <TopCropsBarChart data={filtered} />

      <CropList crops={filtered} onSelect={setSelectedCrop} />

      <CropTrendDrawer
        crop={selectedCrop}
        trend={trend}
        onClose={() => setSelectedCrop(null)}
      />
    </div>
  );
}
