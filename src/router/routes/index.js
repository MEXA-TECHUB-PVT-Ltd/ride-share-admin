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

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/login";

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


// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/dashbaord/default",
    element: <AnalyticsDashboard />,
  },
  {
    path: "/updatepassword",
    element: <PasswordUpdate />,
  },
  {
    path: "/privacypolicy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/termsandconditions",
    element: <TermsAndConditions />,
  },
  {
    path: "/file-upload",
    element: <FileUpload />,
  },
  {
    path: "/apps/user/list",
    element: <UserList />,
  },
  {
    path: "/presetquestions",
    element: <PresetQuestions />,
  },
  {
    path: "/cartype",
    element: <CarType />,
  },
  {
    path: "/driver-fair",
    element: <RidePrice />,
  },
  {
    path: "/passenger-fair",
    element: <PassengerFair />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/complaints",
    element: <Complaints />,
  },
  {
    path: "/noninsuranceusers",
    element: <NonInsuranceUsers />,
  },
  {
    path: "/deleteduseraccounts",
    element: <Deletedusers />,
  },
  {
    path: "/add_document/:id",
    element: <AddDocument />,
  },
  {
    path: "/apps/invoice/preview/:id",
    element: <InvoicePreview />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/otpverification",
    element: <Otpverification />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/setnewpassword",
    element: <SetNewPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
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
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
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
