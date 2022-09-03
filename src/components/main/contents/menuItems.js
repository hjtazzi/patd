export default menuItems = [
  {
    title: "info",
    submenu: [{
      title: "info",
      content: "info-content"
    }]
  },
  {
    title: "config",
    submenu: [
      {
        title: "admin",
        content: "config-admin-content"
      },
      {
        title: "ssid",
        content: "config-ssid-content"
      },
      {
        title: "access point",
        content: "config-access-point-content"
      },
      {
        title: "mqtt",
        content: "config-mqtt-content"
      },
      {
        title: "date/time",
        content: "config-time-content"
      }
    ]
  },
  {
    title: "view",
    submenu: [
      {
        title: "data",
        content: "view-data-content"
      },
      {
        title: "log",
        content: "view-log-content"
      }
    ]
  }
];