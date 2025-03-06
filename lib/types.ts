export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: {
    sections: {
      heading: { level: number; text: string };
      paragraphs: string[];
      codeBlocks?: { language: string; code: string }[];
      lists?: { ordered: boolean; items: string[] }[];
    }[];
  };
  date: string;
  tags: string[];
  author: string;
}