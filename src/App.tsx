import clsx from "clsx";
import { useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Administrateur from "./pages/Administrateur";
import Login from "./pages/Login";
import { Page404 } from "./pages/Page404";
import { DarkModeContext } from "./ui/components/darkMode/DarkModeGlobal";
import { Navigation } from "./ui/components/navigation/Navigation";
import ListeEns from "./ui/modules/enseignant/ListeEns";
import ListeEtudiant from "./ui/modules/etudiant/ListeEtudiant";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "voiture",
        element: <ListeEtudiant />,
      },
      {
        path: "contact",
        element: <Administrateur />,
      },
      {
        path: "inscription",
        element: <ListeEns />,
      },
      {
        path: "connection",
        element: <div>connection</div>,
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
]);

function App() {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={clsx(isDarkMode && "dark")}>
      <div className="transition min-h-[100vh] dark:bg-gray">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
