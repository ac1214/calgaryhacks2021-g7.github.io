// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Notifications from "@material-ui/icons/Notifications";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Calendar from "views/Calendar/Calendar.js";
import NotificationsPage from "views/Notifications/Notifications.js";
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
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
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
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
    component: Typography,
    layout: "",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: BubbleChart,
    component: Icons,
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
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "",
  },
  {
    path: "/Room",
    name: "Room",
    icon: Notifications,
    component: Room,
    layout: ""
  }
];

export default dashboardRoutes;
