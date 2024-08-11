import clsx from "clsx";
import { useContext } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { DataUserContext } from "./context/DataUserContext";
import { LoadingContext } from "./context/LoadingContext";
import Accueil from "./pages/Accueil";
import Enseignant from "./pages/Enseignant";
import Etudiant from "./pages/Etudiant";
import InfoCompte from "./pages/InfoCompte";
import Login from "./pages/Login";
import { Page404 } from "./pages/Page404";
import ReleverNotePage from "./pages/ReleverNotePage";
import { DarkModeContext } from "./ui/components/darkMode/DarkModeGlobal";
import Loading from "./ui/components/loading/Loading";
import { Navigation } from "./ui/components/navigation/Navigation";

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
        path: "accueil",
        element: <Accueil />,
      },
      {
        path: "etudiants",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Etudiant />,
          },
          {
            path: "relever-de-note",
            element: <ReleverNotePage />,
          },
        ],
      },
      {
        path: "enseignants",
        element: <Enseignant />,
      },
      {
        path: "information-compte",
        element: <InfoCompte />,
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

  const { isLoading } = useContext(LoadingContext);
  const { token } = useContext(AuthContext);
  const { dataUser } = useContext(DataUserContext);

  if (isLoading) {
    return <Loading />;
  }
  if (!dataUser.statusAuth && token) {
    return <Loading />;
  }

  return (
    <div className={clsx(isDarkMode && "dark")}>
      <div className="transition min-h-[100vh] dark:bg-gray">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
