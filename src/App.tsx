import axios from "axios";
import clsx from "clsx";
import { useContext, useEffect } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Accueil from "./pages/Accueil";
import Enseignant from "./pages/Enseignant";
import Etudiant from "./pages/Etudiant";
import InfoCompte from "./pages/InfoCompte";
import Login from "./pages/Login";
import { Page404 } from "./pages/Page404";
import ReleverNotePage from "./pages/ReleverNotePage";
import { DarkModeContext } from "./ui/components/darkMode/DarkModeGlobal";
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
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/personne/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken")
            ? JSON.parse(localStorage.getItem("accessToken")).token
            : null,
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({ ...authState, statusAuth: false });
        } else {
          setAuthState({
            nom: res.data.nom,
            id: res.data.id,
            statut: res.data.statut,
            statusAuth: true,
            niveau: res.data.niveau,
            matricule: res.data.matricule,
            parcours: res.data.parcours,
          });
        }
      });
  }, []);

  return (
    <div className={clsx(isDarkMode && "dark")}>
      <div className="transition min-h-[100vh] dark:bg-gray">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
