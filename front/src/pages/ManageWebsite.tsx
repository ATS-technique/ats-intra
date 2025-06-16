// import MarkdownEditor from '@uiw/react-markdown-editor';
import { useState } from "react";
import Tabs from "../components/Tabs/Tabs";
import TabPanel from "../components/Tabs/TabPanel";
import Articles from "../components/Website/Articles";
import PressMentions from "../components/Website/pressMentions";
import DisplayError from "../components/Error/DisplayError";

const Dome = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="px-4 py-2 w-full h-screen overflow-scroll">
      {isError ? (
        <DisplayError errorMessage={errorMessage} />
      ) : (
        <Tabs>
          {/* Conseils & Astuces */}
          <TabPanel label=" Conseils & Astuces">
            <Articles setIsError={setIsError} setErrorMessage={setErrorMessage} />
          </TabPanel>

          {/* Ils parlent de nous */}
          <TabPanel label="Ils parlent de nous">
            <PressMentions setIsError={setIsError} setErrorMessage={setErrorMessage} />
          </TabPanel>

          <TabPanel label="Employés">Tab 3 Content</TabPanel>
          <TabPanel label="Machines">Tab 4 Content</TabPanel>
        </Tabs>
      )}
    </div>
  );
};

export default Dome;
