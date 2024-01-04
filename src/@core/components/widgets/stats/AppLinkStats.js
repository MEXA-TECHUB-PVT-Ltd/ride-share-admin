// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import PropTypes from "prop-types";
import classnames from "classnames";
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Button, Card, CardBody, Input } from "reactstrap";
import { useEffect, useState } from "react";
import { Edit2 } from "react-feather"; // Assuming you are using react-feather for icons

// ** Default Options
import { areaChartOptions } from "./ChartOptions";
import {
  useCreateAppLinkMutation,
  useGetAppLinkQuery,
} from "../../../../redux/dashboardApi";

const AppLinkStats = (props) => {
  // ** Props
  const {
    icon,
    color,
    stats,
    statTitle,
    series,
    options,
    type,
    height,
    className,
    ...rest
  } = props;
  const {
    data,
    isLoading: loading,
    error: err,
  } = useGetAppLinkQuery({ id: 1 });
  const [appLink, setAppLink] = useState("");
  const [error, setError] = useState();

  const handleInputChange = (event) => {
    setAppLink(event.target.value);
  };

  const [createAppLink, { isLoading }] = useCreateAppLinkMutation();

  const handleAppLink = async () => {
    if (!appLink.trim()) {
      setError("Link field can't be empty!");
      return;
    }
    try {
      await createAppLink({
        url: appLink,
      }).unwrap();
      toast.success("App link Added Successfully !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setEmptyfieldalert(false);
      setModalOpen(false);
      setSelectedOption("");
    } catch (error) {
      console.log(error);
      setError(error?.data?.details);
    }
  };

  useEffect(() => {
    if (data && data.result && data.result.url) {
      setAppLink(data.result.url);
    }
  }, [data]);

  return (
    <Card {...rest}>
      <CardBody className={classnames("pb-1", { [className]: className })}>
        <p className="card-text">{statTitle}</p>
        <div className="d-flex">
          <Input
            type="text"
            placeholder="https://www.example.com"
            value={loading ? "loading......" : appLink}
            onChange={handleInputChange}
          />
          <Button
            color="info"
            onClick={handleAppLink}
            style={{ marginLeft: "10px" }}
            disabled={isLoading}
          >
            <Edit2 size={15} />
          </Button>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </CardBody>
    </Card>
  );
};

export default AppLinkStats;

// ** PropTypes
AppLinkStats.propTypes = {
  type: PropTypes.string,
  height: PropTypes.string,
  options: PropTypes.object,
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  stats: PropTypes.string.isRequired,
  series: PropTypes.array.isRequired,
  statTitle: PropTypes.string.isRequired,
};

// ** Default Props
AppLinkStats.defaultProps = {
  color: "primary",
  options: areaChartOptions,
};
