// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import axios from "axios";
import { Package } from "react-feather";

// ** Custom Components
import StatsWithAreaChart from "@components/widgets/stats/StatsWithAreaChart";
import AppLinkStats from "../../../../@core/components/widgets/stats/AppLinkStats";
import { useCreateAppLinkMutation } from "../../../../redux/dashboardApi";

const AppLink = ({ kFormatter, warning, count }) => {


  return (
    <AppLinkStats
      icon={<Package size={21} />}
      color="primary"
      //   stats={count}
      statTitle="App Link"
      //   options={options || null}
      //   series={data || null}
      type="area"
    />
  );
};
export default AppLink;
