import { Alert, Box, Button, styled } from "@mui/material";
import { useGetPostsQuery } from "../../generated/graphql";
import Loader from "../common/Loader";
import PostList from "./PostList";
import { Post } from "../common/commonTypes";

const RetryButton = styled(Button)({
  display: "block",
  marginTop: "10px",
});

const PostContainer = () => {
  const { data, loading, error, refetch } = useGetPostsQuery({
    fetchPolicy: "network-only",
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Loader open={loading} />
      {data && <PostList posts={data.getPosts as Post[]} />}
      {error && (
        <Alert sx={{ marginTop: 2, width: "50%" }} severity="error">
          {error.message}, please try again.
          <RetryButton
            color="error"
            variant="contained"
            onClick={() => {
              console.log("retry");
              refetch();
            }}
          >
            Retry
          </RetryButton>
        </Alert>
      )}
    </Box>
  );
};

export default PostContainer;
