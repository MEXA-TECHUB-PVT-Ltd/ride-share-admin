import { Eye } from "react-feather";
import { Link } from "react-router-dom";
import { Badge, Button, Tooltip } from "reactstrap";

export const verificationColumns = (
  handleVerification,
  handleViewVerificationModal,
  toggleTooltipView,
  tooltipOpenView
) => {
  return [
    {
      name: "ID",
      selector: "index",
      sortable: true,
      cell: (row, index) => <p>{"#"}</p>,
    },
    {
      name: "License Number",
      selector: "license_number",
      sortable: true,
    },
    {
      name: "Expiry Date",
      selector: "expiry_date",
      sortable: true,
      cell: (row) => new Date(row.expiry_date).toLocaleDateString(),
    },
    {
      name: "User Email",
      selector: "user_details.email",
      sortable: true,
    },
    {
      name: "Status",
      selector: "user_details.is_verified_driver",
      sortable: true,
      cell: (row) => (
        <Badge
          color={row.user_details.is_verified_driver ? "success" : "danger"}
        >
          {row.user_details.is_verified_driver ? "Verified" : "Not Verified"}
        </Badge>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              gap: "5px",
            }}
          >
            <Button
              color={
                !row.user_details.is_verified_driver ? "success" : "danger"
              }
              onClick={() => handleVerification(row)}
              style={{ width: "120px" }}
            >
              {row.user_details.is_verified_driver ? "UnVerify" : "Verify"}
            </Button>
            <Link to={`/user-details?user_id=${row?.user_details?.id}`}>
              <Eye
                style={{
                  cursor: "pointer",
                  color: "#00cfe8",
                  fontSize: "15px",
                }}
                id={`viewTooltip_${row.id}`}
                onClick={() => handleViewVerificationModal(row)}
                onMouseEnter={() => toggleTooltipView(row.id)}
                onMouseLeave={() => toggleTooltipView(row.id)}
              />
              <Tooltip
                placement="top"
                isOpen={tooltipOpenView === row.id}
                target={`viewTooltip_${row.id}`}
                toggle={() => toggleTooltipView(row.id)}
              >
                View
              </Tooltip>
            </Link>
          </div>
        </>
      ),
    },
  ];
};
