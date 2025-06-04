import { useState, ReactNode } from "react";

interface TabsProps {
  children: ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Navigation des onglets */}
      <nav className="flex space-x-2 border-b border-neutral-300 dark:border-neutral-700 h-[5vh]">
        {Array.isArray(children) &&
          children.map((child, index) =>
            "props" in child ? (
              <button
                key={index}
                className={`py-2 px-4 text-sm font-medium transition ${
                  activeTab === index
                    ? "border-b-2 border-neutral-500 text-neutral-800 dark:text-neutral-400"
                    : "text-neutral-700 dark:text-neutral-400 hover:text-orange-500"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {child.props.label}
              </button>
            ) : null,
          )}
      </nav>

      {/* Affichage du contenu actif */}
      <div className="px-4 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-md mt-4 overflow-scroll h-[90vh]">
        {Array.isArray(children) && children[activeTab]}
      </div>
    </div>
  );
};

export default Tabs;
