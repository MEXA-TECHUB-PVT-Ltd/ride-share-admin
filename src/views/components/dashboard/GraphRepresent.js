import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Card,
  CardBody,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { useGetGraphicRepresentQuery } from "../../../redux/dashboardApi";

const monthOrder = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const GraphRepresent = (props) => {
  const [selectedInterval, setSelectedInterval] = useState("month");
  const intervals = ["day", "week", "month", "year"];
  const { data, error, isLoading } = useGetGraphicRepresentQuery({
    interval: selectedInterval,
  });

  if (isLoading) {
    <Spinner color="primary" />;
  }

  // ** States
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const [chartData, setChartData] = useState({
    series: [{ name: "Users", data: [] }],
    options: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#3FA9F5"],
      },
      fill: {
        opacity: 0.9,
        colors: ["#3FA9F5"],
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: monthOrder,
      },
    },
  });

  useEffect(() => {
    if (data) {
      let chartDataArray = [];
      let categories = [];

      switch (selectedInterval) {
        case "day":
          const dailyData = data.result
            .filter(
              (item) => new Date(item.date).getFullYear() === selectedYear
            )
            .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

          chartDataArray = dailyData.map((item) =>
            parseInt(item.user_count, 10)
          );
          categories = dailyData.map((item) => item.date.split("T")[0]); // Format date to 'YYYY-MM-DD'
          break;
        case "week":
          const weeklyData = data.result.filter((item) => {
            if (typeof item.week === "string") {
              const start = new Date(item.week.split(" - ")[0]).getFullYear();
              return start === selectedYear;
            }
            return false;
          });

          chartDataArray = weeklyData.map((item) =>
            item.week ? parseInt(item.user_count, 10) : 0
          );
          categories = weeklyData.map((item) =>
            item.week ? item.week.split(" - ")[0] : "Unknown"
          );
          break;

        case "month":
          // Initialize an object with all months set to a user count of 0
          const monthCounts = monthOrder.reduce((acc, month, index) => {
            const monthString = `${selectedYear}-${String(index + 1).padStart(
              2,
              "0"
            )}-01`; // Format as 'YYYY-MM-01'
            acc[monthString] = 0;
            return acc;
          }, {});

          // Populate the object with user counts from the API data
          data.result.forEach((item) => {
            const monthDate = new Date(item.month);
            const monthString = `${monthDate.getFullYear()}-${String(
              monthDate.getMonth() + 1
            ).padStart(2, "0")}-01`;
            if (monthDate.getFullYear() === selectedYear) {
              monthCounts[monthString] = parseInt(item.user_count, 10);
            }
          });

          chartDataArray = Object.values(monthCounts);
          categories = Object.keys(monthCounts).map((date) => {
            const monthDate = new Date(date);
            return `${
              monthOrder[monthDate.getMonth()]
            } ${monthDate.getFullYear()}`; // Format as 'Month YYYY'
          });
          break;

        case "year":
          // Initialize an object for yearly user counts
          const initialYear = new Date(data.result[0].year).getFullYear();
          const finalYear = new Date(
            data.result[data.result.length - 1].year
          ).getFullYear();
          const yearCounts = {};
          for (let year = initialYear; year <= finalYear; year++) {
            yearCounts[year] = 0;
          }

          // Populate the object with user counts from the API data
          data.result.forEach((item) => {
            const year = new Date(item.year).getFullYear();
            yearCounts[year] = parseInt(item.user_count, 10);
          });

          chartDataArray = Object.values(yearCounts);
          categories = Object.keys(yearCounts);
          break;

        default:
          break;
      }

      setChartData({
        ...chartData,
        series: [{ name: "Users", data: chartDataArray }],
        options: { ...chartData.options, xaxis: { categories } },
      });
    }
  }, [data, selectedInterval, selectedYear]);

  useEffect(() => {
    // Example: Set years based on data
    if (data) {
      const uniqueYears = new Set(
        data.result.map((item) =>
          new Date(
            item.date || item.week || item.month || item.year
          ).getFullYear()
        )
      );
      setYears(Array.from(uniqueYears));
    }
  }, [data]);

  return (
    <Card>
      <CardBody>
        <Row className="pb-50">
          <Col
            xs={{ order: 1 }}
            className="d-flex justify-content-between flex-column text-end"
          >
            <UncontrolledDropdown className="chart-dropdown">
              <DropdownToggle
                color=""
                className="bg-transparent btn-sm border-0 p-50"
              >
                {selectedInterval.charAt(0).toUpperCase() +
                  selectedInterval.slice(1)}
              </DropdownToggle>
              <DropdownMenu>
                {intervals.map((interval) => (
                  <DropdownItem
                    key={interval}
                    onClick={() => setSelectedInterval(interval)}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {interval.charAt(0).toUpperCase() + interval.slice(1)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown className="chart-dropdown">
              <DropdownToggle
                color=""
                className="bg-transparent btn-sm border-0 p-50"
              >
                {selectedYear}
              </DropdownToggle>
              <DropdownMenu>
                {years.map((year) => (
                  <DropdownItem
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {year}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="area"
              height={200}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default GraphRepresent;
