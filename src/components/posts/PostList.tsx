import { FC } from "react";
import { Post } from "../common/commonTypes";
import { Box } from "@mui/material";
import PostListItem from "./PostListItem";

interface Props {
  posts: Post[];
}

const PostList: FC<Props> = ({ posts }) => {
  return (
    <Box>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </Box>
  );
};

export default PostList;
