// import MarkdownEditor from '@uiw/react-markdown-editor';
import { useState } from "react";
import Tabs from "../components/Tabs/Tabs";
import TabPanel from "../components/Tabs/TabPanel";
import Articles from "../components/Website/Articles";
import PressMentions from "../components/Website/pressMentions";
import DisplayError from "../components/Error/DisplayError";
import DisplaySuccess from "../components/Error/DisplaySuccess";

const Dome = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  return (
    <div className="px-4 py-2 w-full h-screen overflow-scroll">
      {isError ? <DisplayError errorMessage={errorMessage} onClose={() => setIsError(false)} /> : null}
      {isSuccess ? <DisplaySuccess message={successMessage} onClose={() => setIsSuccess(false)} /> : null}
      <Tabs>
        {/* Conseils & Astuces */}
        <TabPanel label=" Conseils & Astuces">
          <Articles
            setIsError={setIsError}
            setIsSuccess={setIsSuccess}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        </TabPanel>

        {/* Ils parlent de nous */}
        <TabPanel label="Ils parlent de nous">
          <PressMentions
            setIsError={setIsError}
            setIsSuccess={setIsSuccess}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        </TabPanel>

        <TabPanel label="Employés">Tab 3 Content</TabPanel>
        <TabPanel label="Machines">Tab 4 Content</TabPanel>
      </Tabs>
    </div>
  );
};

export default Dome;
