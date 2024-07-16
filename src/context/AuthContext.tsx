import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { url_api } from "../utils/url-api";
import { DataUserContext } from "./DataUserContext";
import { LoadingContext } from "./LoadingContext";

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  setToken: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(null);
  const { setIsLoading } = useContext(LoadingContext);
  const { dataUser, setDataUser } = useContext(DataUserContext);

  useEffect(() => {
    const loadToken = () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setTokenState(storedToken);
      }
    };

    loadToken();
  }, []);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axios.get(`${url_api}/personne/auth`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.error) {
          setDataUser({
            ...dataUser,
            statusAuth: false,
          });
          setIsLoading(false);
          if (token) {
            setToken(null);
          }
        } else {
          setDataUser({
            id: response.data.id,
            nom: response.data.nom,
            statut: response.data.statut,
            niveau: response.data.niveau,
            parcours: response.data.parcours,
            matricule: response.data.matricule,
            statusAuth: true,
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        console.log("accèes refuser §§§§");
      }
    };
    fetchProtectedData();
  }, [token]);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setTokenState(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
