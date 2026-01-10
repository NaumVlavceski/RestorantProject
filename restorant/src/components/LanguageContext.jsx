import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import translations from "../translations/translations.json";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
    const [l, setL] = useState(() => localStorage.getItem("lang") || "mk");

    useEffect(() => {
        localStorage.setItem("lang", l);
    }, [l]);

    const t = useMemo(() => translations[l] || translations.mk, [l]);

    const value = useMemo(() => ({ l, setL, t }), [l, t]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
    return ctx;
};
