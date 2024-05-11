import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { Ri24HoursFill } from "react-icons/ri";
import { AuthContext } from "../../../context/AuthContext";
import { Container } from "../../components/container/Container";
import Header from "../../components/header/Header";
import { Logo } from "../../design-system/logo/Logo";
import ListeMatiereByNiveau from "../matiere/ListeMatiereByNiveau";
import ListeNoteByEtudiant from "../note/ListeNoteByEtudiant";

const allData = [
  {
    icon: <Ri24HoursFill />,
    label: "Matières",
    component: <ListeMatiereByNiveau />,
  },
  {
    icon: <Ri24HoursFill />,
    label: "Notes par matières",
    component: <ListeNoteByEtudiant />,
  },
  {
    icon: <Ri24HoursFill />,
    label: "Relever de notes",
    component: <Logo />,
  },
];

const initialTabs = allData;

export default function AccueilEtudiant() {
  const [selectedTab, setSelectedTab] = useState(initialTabs[0]);
  const { authState } = useContext(AuthContext);

  return (
    <>
      <Header
        name={authState.nom.toUpperCase()}
        info="En tant qu'etudiant de l'ENI, vous avez les droits de consulter la liste des enseignants, de voir vos notes dès qu'ils sont disponnibles et aussi de générer votre relever de note."
      />
      <Container className="mb-11 flex justify-between items-center gap-4">
        <div className="flex flex-col gap-7 ">
          {initialTabs.map((item) => (
            <div className="relative group" key={item.label}>
              <p
                className={clsx(
                  "px-8 py-4 cursor-pointer flex items-center gap-2 text-caption1 font-medium",
                  item === selectedTab && "selecte bg-secondary-200/10"
                )}
                onClick={() => setSelectedTab(item)}
              >
                {item.icon}
                {item.label}
              </p>
              <span
                className={clsx(
                  item === selectedTab
                    ? "h-[2px] rounded inline-block bg-secondary  dark:bg-secondary-200 absolute left-1/2 -translate-x-1/2 w-full transition-[width] ease-in-out duration-300"
                    : "h-[2px] rounded inline-block w-0 bg-secondary absolute left-0  group-hover:w-full transition-[width] ease-in-out duration-300 hover:font-medium"
                )}
              ></span>
            </div>
          ))}
        </div>
        <div className="flex justify-center flex-grow select-none h-[630px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {selectedTab ? selectedTab.component : "😋"}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </>
  );
}
