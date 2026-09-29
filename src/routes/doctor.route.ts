const prefix = "/doctor";
export const doctorRoutes = [
  {
    title: "Schedule",
    items: [
      {
        title: "Overview",
        url: prefix,
      },
      {
        title: "Schedules",
        url: `${prefix}/schedules`,
      },
    ],
  },
  {
    title: "App Settings",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
        isActive: true,
      },
      {
        title: "Logout",
        url: "#",
        onclick: "logout",
      },
    ],
  },
];
