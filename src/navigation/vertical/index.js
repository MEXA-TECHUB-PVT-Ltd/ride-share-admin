import { Mail, Home, Truck, Activity, Book, UserX, Users, MessageSquare, UserMinus, HelpCircle } from "react-feather";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Activity size={20} />,
    navLink: "/dashbaord/default",
  },
  // {
  //   id: "presetquestions",
  //   title: "Car Type",
  //   icon: <HelpCircle size={20} />,
  //   navLink: "/presetquestions",
  // },
  {
    id: "cartype",
    title: "Car Type",
    icon: <Book size={20} />,
    navLink: "/cartype",
  },
  {
    id: "ridefair",
    title: "Ride Fair",
    icon: <Truck size={20} />,
    navLink: "/ridefair",
  },
  {
    id: "users",
    title: "Users",
    icon: <Users size={20} />,
    navLink: "/users",
  },
  {
    id: "complaints",
    title: "Complaints",
    icon: <MessageSquare size={20} />,
    navLink: "/complaints",
  },
  {
    id: "noninsuranceusers",
    title: "Non-Insurance Users",
    icon: <UserX size={20} />,
    navLink: "/noninsuranceusers",
  },
  {
    id: "deleteduseraccounts",
    title: "Deleted Users",
    icon: <UserMinus size={20} />,
    navLink: "/deleteduseraccounts",
  },
  // {
  //   id: "userList",
  //   title: "User List",
  //   icon: <Mail size={20} />,
  //   navLink: "/apps/user/list",
  // }, 
];
