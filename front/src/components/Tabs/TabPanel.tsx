import { ReactNode } from "react";

interface TabPanelProps {
  label: string; // Nom affiché dans la navigation
  children: ReactNode; // Contenu de l'onglet
}

const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <div className="height-[90vh] overflow-scroll">{children}</div>;
};

export default TabPanel;
