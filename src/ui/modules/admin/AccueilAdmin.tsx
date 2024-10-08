import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { RiAddBoxLine, RiListUnordered } from "react-icons/ri";
import { DataUserContext } from "../../../context/DataUserContext";
import { Container } from "../../components/container/Container";
import Header from "../../components/header/Header";
import ListeMatiere from "../matiere/ListeMatiere";
import ListeModule from "../module/ListeModule";
import ListeNote from "../note/ListeNote";
import FormPersonne from "../personne/FormPersonne";

const allData = [
  {
    icon: <RiAddBoxLine />,
    label: "Ajouter une personne",
    component: <FormPersonne />,
  },
  {
    icon: <RiListUnordered />,
    label: "Liste des modules",
    component: <ListeModule />,
  },
  {
    icon: <RiListUnordered />,
    label: "Liste des matières",
    component: <ListeMatiere />,
  },
  {
    icon: <RiListUnordered />,
    label: "Liste des notes",
    component: <ListeNote />,
  },
];

const initialTabs = allData;

export default function AccueilAdmin() {
  const [selectedTab, setSelectedTab] = useState(initialTabs[0]);
  const { dataUser } = useContext(DataUserContext);

  return (
    <>
      <Header
        name={dataUser.nom.toUpperCase()}
        info="En tant qu'administrateur de cette application, vous avez le droit de consulter
            la liste des étudiants, des enseignants et des matières et vous avez également le droit d'en ajouter des nouvelles !"
      />
      <Container className="mt-11 flex items-center justify-between gap-4 max-[1230px]:flex-col">
        <div className="flex flex-col max-[1230px]:flex-row gap-5 max-sm:gap-0 max-sm:justify-between dark:text-white">
          {initialTabs.map((item) => (
            <div className="relative group" key={item.label}>
              <p
                className={clsx(
                  "px-8 max-sm:px-5 py-4 cursor-pointer flex items-center gap-2 text-caption4 font-medium",
                  item === selectedTab
                    ? "selecte bg-secondary-200/10"
                    : " hover:bg-secondary-200/10 transition"
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
