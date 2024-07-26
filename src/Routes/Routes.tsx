import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../components/HomePage";
import BiddingProcess from "../components/BiddingProcess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "biddingprocess", element: <BiddingProcess /> },
    ],
  },
]);

export default router;
