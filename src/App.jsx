import "./styles/app.css";
import router from "./routes/appRouter";
import { RouterProvider } from "react-router-dom";
import "./i18n";
import "rc-slider/assets/index.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
