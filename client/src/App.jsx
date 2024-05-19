import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Protected } from './components';
import './App.css';
import {
  HomePage,
  AboutPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
  CharacterIndexPage,
  CharacterShowPage,
  ProjectIndexPage,
  ProjectShowPage,
} from './pages';
import { ScriptProvider } from './contexts';

//Don't forget to change name of Provider

//To protect Route do this element={<Protected><Page /></Protected>}

function App() {
  return (
    <ScriptProvider>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route
            path="/about"
            element={
              <Protected>
                <AboutPage />
              </Protected>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<NotFoundPage />} />

          <Route path="/projects">
            <Route index element={<ProjectIndexPage />} />
            <Route path=":projectId" element={<ProjectShowPage />} />
            <Route path=":projectId/characters">
              <Route index element={<CharacterIndexPage />} />
              <Route path=":characterId" element={<CharacterShowPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ScriptProvider>
  );
}

export default App;
