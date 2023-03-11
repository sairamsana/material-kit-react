const settings = {
  REACT_APP_API_URL: "http://localhost:5004/admin-dashboard/",
  BASE_URL : "http://127.0.0.1:8080/"
};

const config = { ...settings, ...process.env };
export default config;
