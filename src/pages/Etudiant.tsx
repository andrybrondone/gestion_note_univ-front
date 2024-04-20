import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Ri24HoursFill } from "react-icons/ri";
import { Container } from "../ui/components/container/Container";
import Header from "../ui/components/header/Header";
import FormEns from "../ui/modules/enseignant/FormEns";
import FormEtudiant from "../ui/modules/etudiant/FormEtudiant";
import FormMatiere from "../ui/modules/matiere/FormMatiere";
import InfoMatiere from "../ui/modules/matiere/ListeMatiere";

const allData = [
  {
    icon: <Ri24HoursFill />,
    label: "Statistique",
    component: <FormMatiere />,
  },
  {
    icon: <Ri24HoursFill />,
    label: "Ajouter étudiant",
    component: <FormEtudiant />,
  },
  { icon: "🥬", label: "Ajouter enseignant", component: <FormEns /> },
  { icon: "🧀", label: "Ajouter module", component: <InfoMatiere /> },
];

const initialTabs = allData;

export default function Etudiant() {
  const [selectedTab, setSelectedTab] = useState(initialTabs[0]);

  return (
    <>
      <Header
        name="ANDRIAMBOLOLOMANANA"
        info="En tant qu'étudiant en première année de lience professionnelle à
            l'Ecole Nationtale d'informatique, vous avez le droit de consulter
            la liste des matières qui vous attendent durant cette année et de
            voire vos note obténue lors des évaluations théoriques et pratiques"
      />
      <Container className="mb-11 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-5">
          {initialTabs.map((item) => (
            <p
              key={item.label}
              className={clsx(
                "px-8 py-4 cursor-pointer flex items-center gap-2 text-caption1 rounded-[20px]",
                item === selectedTab ? "selected" : "",
                item === selectedTab ? "bg-primary-300" : null
              )}
              onClick={() => setSelectedTab(item)}
            >
              {item.icon}
              {item.label}
            </p>
          ))}
        </div>
        <div className="flex justify-center py-6 flex-grow select-none">
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
