// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import InvoicePreview from "../../views/invoice/preview";
import AddDocument from "../../views/addDocument";
import PassengerFair from "../../views/PassengerFair";
import UserDetails from "../../views/UserDetails";
import CarColor from "../../views/CarColors";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/dashbaord/default";

const Home = lazy(() => import("../../views/Home"));
const UpdatePassword = lazy(() => import("../../views/UpdatePassword"));
const PrivacyPolicy = lazy(() => import("../../views/PrivacyPolicy"));
const PasswordUpdate = lazy(() => import("../../views/passwordupdate"));
const TermsAndConditions = lazy(() => import("../../views/TermsAndConditions"));  
const Login = lazy(() => import("../../views/Login"));
const Register = lazy(() => import("../../views/Register"));
const ForgotPassword = lazy(() => import("../../views/ForgotPassword"));
const Otpverification = lazy(() => import("../../views/Otpverification"));
const SetNewPassword = lazy(() => import("../../views/Setnewpassword"));  
const Error = lazy(() => import("../../views/Error"));
const AnalyticsDashboard = lazy(() => import("../../views/dashboard/analytics"));
const UserList = lazy(() => import('../../views/user/list'));
const RidePrice = lazy(() => import('../../views/Rideprice')); 
const Users = lazy(() => import('../../views/Users'));
const Complaints = lazy(() => import('../../views/Complaints')); 
const NonInsuranceUsers = lazy(() => import('../../views/Noninsuranceusers'));  
const Deletedusers = lazy(() => import('../../views/Deletedusers'));  
const PresetQuestions = lazy(() => import('../../views/Presetquestions'));
const CarType = lazy(() => import('../../views/Cartype')); 
const FileUpload = lazy(() => import('../../views/FileUpload'))


const isAdminLoggedIn = () => {
  return localStorage.getItem("admin") !== null;
};

const PublicOnlyRoute = ({ children }) => {
  if (isAdminLoggedIn()) {
    console.log("your are logged in")
    return <Navigate to={DefaultRoute} />;
  }
  return children;
};

const PrivateRoute = ({ children }) => {
  if (!isAdminLoggedIn()) {
    console.log("your are not logged in")
    return <Navigate to="/login" />;
  }
  return children;
};

// ** Merge Routes
const Routes = [
  {
    path: "/",
    element: isAdminLoggedIn() ? (
      <Navigate replace to={DefaultRoute} />
    ) : (
      <Navigate replace to="/login" />
    ),
  },
  {
    path: "/dashbaord/default",
    element: <AnalyticsDashboard />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/user-details",
    element: <UserDetails />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/updatepassword",
    element: <PasswordUpdate />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/car-colors",
    element: <CarColor />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/privacypolicy",
    element: <PrivacyPolicy />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/termsandconditions",
    element: <TermsAndConditions />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/file-upload",
    element: <FileUpload />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/apps/user/list",
    element: <UserList />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/presetquestions",
    element: <PresetQuestions />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/cartype",
    element: <CarType />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/driver-fair",
    element: <RidePrice />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/passenger-fair",
    element: <PassengerFair />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/users",
    element: <Users />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/complaints",
    element: <Complaints />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/noninsuranceusers",
    element: <NonInsuranceUsers />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/deleteduseraccounts",
    element: <Deletedusers />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/add_document/:id",
    element: <AddDocument />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/apps/invoice/preview/:id",
    element: <InvoicePreview />,
    meta: {
      // layout: "blank",
      publicOnly: false,
    },
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
      publicOnly: true,
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
      publicOnly: true,
    },
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
      publicOnly: true,
    },
  },
  {
    path: "/otpverification",
    element: <Otpverification />,
    meta: {
      layout: "blank",
      publicOnly: true,
    },
  },
  {
    path: "/setnewpassword",
    element: <SetNewPassword />,
    meta: {
      layout: "blank",
      publicOnly: true,
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
      publicOnly: false,
    },
  },
];



const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;

      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag =
          route.meta && route.meta.layout === "blank"
            ? PublicOnlyRoute
            : PrivateRoute;

        isBlank = route.meta && route.meta.layout === "blank";

        const Wrapper =
          isObjEmpty(route.element.props) && !isBlank
            ? LayoutWrapper
            : Fragment;

        route.element = (
          <Wrapper {...(!isBlank ? getRouteMeta(route) : {})}>
            <RouteTag>{route.element}</RouteTag>
          </Wrapper>
        );

        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};


const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
