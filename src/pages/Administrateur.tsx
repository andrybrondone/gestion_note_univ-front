import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Ri24HoursFill } from "react-icons/ri";
import { Container } from "../ui/components/container/Container";
import Header from "../ui/components/header/Header";
import { Logo } from "../ui/design-system/logo/Logo";
import FormMatiere from "../ui/modules/matiere/FormMatiere";
import FormModule from "../ui/modules/module/FormModule";
import FormNote from "../ui/modules/note/FormNote";
import FormPersonne from "../ui/modules/personne/FormPersonne";

const allData = [
  {
    icon: <Ri24HoursFill />,
    label: "Statistique",
    component: <FormNote />,
  },
  {
    icon: <Ri24HoursFill />,
    label: "Ajouter une personne",
    component: <FormPersonne />,
  },
  {
    icon: <Ri24HoursFill />,
    label: "Liste des étudiants",
    component: <Logo />,
  },
  { icon: "🥬", label: "Liste des enseignants", component: <Logo /> },
  { icon: "🧀", label: "Liste des modules", component: <FormModule /> },
  { icon: "🧀", label: "Liste des matières", component: <FormMatiere /> },
];

const initialTabs = allData;

export default function Administrateur() {
  const [selectedTab, setSelectedTab] = useState(initialTabs[0]);

  return (
    <>
      <Header
        name="ANDRIAMBOLOLOMANANA"
        info="En tant qu'administrateur de cette application, vous avez le droit de consulter
            la liste des étudiants, des enseignants et des matières et vous avez également le droit d'en ajouter des nouvelles"
      />
      <Container className="mb-11 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-5 ">
          {initialTabs.map((item) => (
            <div className="relative group" key={item.label}>
              <p
                className={clsx(
                  "px-8 py-4 cursor-pointer flex items-center gap-2 text-caption1",
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
