"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface LanguageFilterProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
}

export function LanguageFilter({
  languages,
  selectedLanguage,
  onLanguageSelect,
}: LanguageFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2"
    >
      <Button
        onClick={() => onLanguageSelect("all")}
        className={`language-filter ${selectedLanguage === "all" ? "active" : ""}`}
      >
        All
      </Button>
      {languages.map((language) => (
        <Button
          key={language}
          onClick={() => onLanguageSelect(language)}
          className={`language-filter ${
            selectedLanguage === language ? "active" : ""
          }`}
        >
          {language}
        </Button>
      ))}
    </motion.div>
  );
}