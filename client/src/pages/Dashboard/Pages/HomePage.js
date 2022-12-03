import React from "react";
import FeaturedInfo from "../../../components/Dashboard/FeaturedInfo";
import FeaturedInfoComponent from "../../../components/Dashboard/FeaturedInfo/FeaturedInfoComponent";
import Chart from "./Chart";

export const HomePage = () => {
  return (
    <div className="h-auto  ">
      <FeaturedInfoComponent />
      <Chart />
    </div>
  );
};
