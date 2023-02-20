import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Authentication, { authAction } from "./components/Authentication";
import { tokenLoader } from "./storage/Requests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "token",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      { path: "auth", element: <Authentication />, action: authAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
