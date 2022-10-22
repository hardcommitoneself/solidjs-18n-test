import { Component, createSignal } from "solid-js";
import { I18nContext, createI18nContext, useI18n } from "@solid-primitives/i18n";

const Home: Component = () => {
    const [t] = useI18n();
    const [name, setName] = createSignal("Greg");

    return <>{t("hello", { name: name() }, "Hello {{ name }}!")}!</>
}

export default Home;