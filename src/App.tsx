import { Component, lazy, createSignal, onMount, JSX } from "solid-js";
import { Routes, Route, Router, useParams, Outlet, Navigate } from "@solidjs/router";
import {
  I18nContext,
  createI18nContext,
  useI18n,
} from "@solid-primitives/i18n";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));

const dict = {
  fr: {
    hello: "bonjour {{ name }}, comment vas-tu ?",
  },
  en: {
    hello: "hello {{ name }}, how are you?",
  },
};

const value = createI18nContext(dict, "fr");

const AppWrapper: Component = () => {
  const params = useParams();
  const [t, { locale }] = useI18n();

  const lang = params.lang === "" ? "en" : params.lang;

  locale(lang);

  return (
    <>
      <Outlet />
    </>
  );
};

const App: Component = () => {
  return (
    <I18nContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate href="/en" />} />
          <Route path="/:lang" component={AppWrapper}>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
          </Route>
        </Routes>
      </Router>
    </I18nContext.Provider>
  );
};

export default App;
