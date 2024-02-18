import React from 'react'
import TopCountries from "./stats/TopCountries";
import Segmentation from "./stats/segmentation";
import Satisfication from "./stats/Satisfaction";
import Graph from "./stats/Graph";
import AddComponent from "./stats/AddComponent";

const Overview = () => {
  return (
    <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2 ">
        <div className="w-full p-2 lg:w-2/3">
    <div className="rounded-lg bg-card sm:h-80 h-60">
      <Graph />
    </div>
  </div>
  <div className="w-full p-2 lg:w-1/3">
    <div className="rounded-lg bg-card h-80">
      <TopCountries />
    </div>
  </div>

  <div className="w-full p-2 lg:w-1/3">
    <div className="rounded-lg bg-card h-80">
      <Segmentation />
    </div>
  </div>
  <div className="w-full p-2 lg:w-1/3">
    <div className="rounded-lg bg-card h-80">
      <Satisfication />
    </div>
  </div>
  <div className="w-full p-2 lg:w-1/3">
    <div className="rounded-lg bg-card overflow-hidden h-80">
      <AddComponent />
    </div>
  </div></div>
  )
}

export default Overview