export interface Post {
  id: string;
  title: string;
  description: string;
  author: Author;
  comments: Comment[];
}

export interface Author {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  text: string;
  author: Author;
}
