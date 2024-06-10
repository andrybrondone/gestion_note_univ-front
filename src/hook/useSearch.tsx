import { useState } from "react";

export default function useSearch() {
  const [search, setSearch] = useState("");
  const [selectedNiveau, setSelectedNiveau] = useState("L1");
  const [selectedParcours, setSelectedParcours] = useState("IG");

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleChangeNiveau = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNiveau(e.target.value);
  };
  const handleChangeParcours = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedParcours(e.target.value);
  };

  return {
    search,
    handleChangeSearch,
    selectedNiveau,
    handleChangeNiveau,
    selectedParcours,
    handleChangeParcours,
  };
}
