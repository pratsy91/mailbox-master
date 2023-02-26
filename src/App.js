import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Authentication, { authAction } from "./components/Authentication";
import { checkAuthLoader, tokenLoader } from "./store/Requests";
import EmailDetails, { emailDetailLoader } from "./pages/EmailDetail";
import Inbox, { emailsLoader } from "./pages/Inbox";
import SentMails, { sentmailsLoader } from "./pages/sentmails";
import { getMails } from "./store/Requests";
import FilteredMails from "./pages/filteredMails";
import SentEmailDetail, { sentMailDetailLoader } from "./pages/sentEmailDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "token",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      { path: "auth", element: <Authentication />, action: authAction },
      {
        path: "email",
        element: <Inbox />,
      },

      {
        path: "email/:emailId",
        element: <EmailDetails />,
        loader: emailDetailLoader,
      },
      {
        path: "sent",
        element: <SentMails />,
        loader: sentmailsLoader,
      },
      {
        path: "sent/:sentId",
        element: <SentEmailDetail />,
        loader: sentMailDetailLoader,
      },
      {
        path: "unread",
        element: <FilteredMails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
