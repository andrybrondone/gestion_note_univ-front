import axios from "axios";
import clsx from "clsx";
import { useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
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
        path: "accueil",
        element: <Administrateur />,
      },
      {
        path: "etudiants",
        element: <ListeEtudiant />,
      },
      {
        path: "enseignants",
        element: <ListeEns />,
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
          accessToken: localStorage.getItem("accessToken"),
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
