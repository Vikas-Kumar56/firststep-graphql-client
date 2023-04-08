import { Box } from "@mui/material";
import { useGetPostsQuery } from "../../generated/graphql";
import Loader from "../common/Loader";
import PostList from "./PostList";
import { Post } from "../common/commonTypes";

const PostContainer = () => {
  const { data, loading, error } = useGetPostsQuery({
    fetchPolicy: "network-only",
  });
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Loader open={loading} />
      {data && <PostList posts={data.getPosts as Post[]} />}
    </Box>
  );
};

export default PostContainer;
