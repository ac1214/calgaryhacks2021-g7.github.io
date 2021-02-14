// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Calendar from "views/Calendar/Calendar.js";
import Room from "./views/Room/Room";

export const routes = [
  "/dashboard",
  "/user",
  "/table",
  "/typography",
  "/icons",
  "/Calendar",
  "/notifications",
  "/Room"
];

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "",
  },
  {
    path: "/table",
    name: "Table List",
    icon: "content_paste",
    component: TableList,
    layout: "",
  },
  {
    path: "/Calendar",
    name: "Calendar",
    icon: CalendarTodayIcon,
    component: Calendar,
    layout: "",
  },
  {
    path: "/Room",
    name: "Room",
    icon: MeetingRoomIcon,
    component: Room,
    layout: ""
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "",
  },
];

export default dashboardRoutes;
