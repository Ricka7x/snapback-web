export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  published: boolean;
}
