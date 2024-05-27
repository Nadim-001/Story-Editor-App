import React, { useState, useContext, createContext } from 'react';
import projectData from '../data';

//step 1: creating  a context which allows us to share info between components
const ScriptContext = createContext();

//step 2: cerate the provider in order to provide the context to the child components
export const ScriptProvider = ({ children }) => {
  //const [user, setUser] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(0);
  const [username, setUsername] = useState('');

  const [currentProject, setCurrentProject] = useState();
  const [currentProjectData, setCurrentProjectData] = useState(projectData);
  const [currentChapter, setCurrentChapter] = useState();

  const [currentCharacter, setCurrentCharacter] = useState();

  const [currentIdeaID, setCurrentIdeaID] = useState();

  const [currentLocationID, setCurrentLocationID] = useState();

  return (
    <ScriptContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userID,
        setUserID,
        username,
        setUsername,
        currentChapter,
        setCurrentChapter,
        currentProject,
        setCurrentProject,
        currentCharacter,
        setCurrentCharacter,
        currentProjectData,
        setCurrentProjectData,
        currentIdeaID,
        setCurrentIdeaID,
        currentLocationID,
        setCurrentLocationID,
      }}
    >
      {children}
    </ScriptContext.Provider>
  );
};
//step 3: we have to create a way for components to consume the shared data
export const useScript = () => useContext(ScriptContext);
