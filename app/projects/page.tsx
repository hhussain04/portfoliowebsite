"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, ExternalLink, Calendar, Code, Star, GitFork, Search, Filter } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  languages_url: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  languages: { [key: string]: number };
}

interface LanguageColors {
  [key: string]: string;
}

const languageColors: LanguageColors = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Ruby: "#701516",
  Go: "#00ADD8",
  PHP: "#4F5D95",
  Swift: "#ffac45",
};

export default function ProjectsPage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("updated");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const perPage = 6;

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.github.com/users/hhussain04/repos?per_page=${perPage}&page=${page}&sort=${sortBy}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data: Repository[] = await response.json();
        setHasMore(data.length === perPage);

        const reposWithLanguages = await Promise.all(
          data.map(async (repo) => {
            const langResponse = await fetch(repo.languages_url);
            const languages = await langResponse.json();
            return { ...repo, languages };
          })
        );

        setRepositories((prev) =>
          page === 1 ? reposWithLanguages : [...prev, ...reposWithLanguages]
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [page, sortBy]);

  const languages = Array.from(
    new Set(repositories.flatMap((repo) => Object.keys(repo.languages || {})))
  );

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  const filteredRepositories = repositories.filter((repo) => {
    const matchesSearch = repo.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLanguages =
      selectedLanguages.length === 0 ||
      Object.keys(repo.languages || {}).some((lang) =>
        selectedLanguages.includes(lang)
      );
    return matchesSearch && matchesLanguages;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-12 pt-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#9370DB] bg-clip-text text-transparent">
          My Projects
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore my open-source projects and contributions on GitHub.
        </p>
      </motion.div>

      {/* Search and Filters Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/40 backdrop-blur-md rounded-2xl border border-[#8A2BE2]/20 p-6 shadow-lg shadow-[#8A2BE2]/5"
      >
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-black/40 border-[#8A2BE2]/20 focus:border-[#8A2BE2] transition-colors"
          />
        </div>

        {/* Language Filters */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-[#8A2BE2]" />
            <h3 className="font-medium">Filter by Language</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <Button
                key={language}
                onClick={() => toggleLanguage(language)}
                variant={selectedLanguages.includes(language) ? "default" : "outline"}
                className={`
                  transition-all duration-200
                  ${
                    selectedLanguages.includes(language)
                      ? "bg-[#8A2BE2] hover:bg-[#9370DB]"
                      : "hover:border-[#8A2BE2] hover:text-[#8A2BE2]"
                  }
                `}
                size="sm"
              >
                {language}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {loading && page === 1 ? (
            // Loading skeletons
            Array.from({ length: perPage }).map((_, i) => (
              <div
                key={i}
                className="bg-black/40 backdrop-blur-md rounded-2xl border border-[#8A2BE2]/20 p-6 shadow-lg shadow-[#8A2BE2]/5"
              >
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-20 w-full mb-4" />
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-6 w-32" />
              </div>
            ))
          ) : (
            filteredRepositories.map((repo) => (
              <motion.div
                key={repo.id}
                variants={item}
                layout
                className="bg-black/40 backdrop-blur-md rounded-2xl border border-[#8A2BE2]/20 p-6 shadow-lg shadow-[#8A2BE2]/5 group hover:border-[#8A2BE2]/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold">{repo.name}</h3>
                    <Button asChild variant="ghost" size="icon" className="text-[#8A2BE2] hover:bg-[#8A2BE2]/10">
                      <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>

                  <p className="text-muted-foreground">
                    {repo.description || "No description available"}
                  </p>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(repo.languages || {}).map(([lang]) => (
                        <Badge
                          key={lang}
                          variant="secondary"
                          className="bg-[#8A2BE2]/10 text-[#8A2BE2] border border-[#8A2BE2]/20"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(repo.updated_at), "MMM d, yyyy")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {/* Load More Button */}
      {!loading && hasMore && filteredRepositories.length > 0 && (
        <div className="text-center">
          <Button
            onClick={() => setPage((p) => p + 1)}
            variant="outline"
            size="lg"
            className="border-[#8A2BE2] text-[#8A2BE2] hover:bg-[#8A2BE2] hover:text-white"
          >
            Load More Projects
          </Button>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && page > 1 && (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#8A2BE2] border-t-transparent"></div>
        </div>
      )}

      {/* No Results */}
      {!loading && filteredRepositories.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-black/40 backdrop-blur-md rounded-2xl border border-[#8A2BE2]/20 shadow-lg shadow-[#8A2BE2]/5"
        >
          <Code className="h-12 w-12 mx-auto text-[#8A2BE2] mb-4" />
          <h3 className="text-lg font-semibold">No projects found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </div>
  );
}