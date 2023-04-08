export interface Comment {
  id: string;
  text: string;
}
export interface Author {
  id: string;
  name: string;
}
export interface Post {
  id: string;
  title: string;
  description: string;
  author: Author;
  comments: Comment[];
}
