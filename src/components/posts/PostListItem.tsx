import { FC, useEffect, useState } from "react";
import { Comment, Post } from "../common/commonTypes";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import CommentList from "../comments/CommentList";
import AddComment from "../comments/AddComment";
import { useAddCommentMutation } from "../../generated/graphql";
import { useAuth } from "../common/AuthProvider";

interface Props {
  post: Post;
}

const PostListItem: FC<Props> = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const auth = useAuth();

  const [addComment, { data, loading, error }] = useAddCommentMutation({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data && !comments.find((comment) => comment.id == data.addComment.id)) {
      setComments((prev) => {
        return [
          {
            text: data.addComment.text,
            id: data.addComment.id,
            author: {
              name: auth?.user?.username,
              id: "not valid id",
            },
          } as Comment,
          ...prev,
        ];
      });
    }
  }, [data]);

  return (
    <Card sx={{ width: 500, mb: 5 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component={"div"}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "space-between", ml: 1 }}>
        <Typography variant="subtitle1">
          Created by: {post.author.name}
        </Typography>
        <Button
          onClick={() => setShowComment(!showComment)}
          size="small"
          color="secondary"
          variant="contained"
        >
          {showComment ? "Hide Comments" : "Show Comments"}
        </Button>
      </CardActions>
      {showComment && (
        <>
          <Divider />
          {auth?.user?.roles.includes("ROLE_ADMIN") && (
            <AddComment
              disabled={loading}
              onSubmit={(comment) => {
                console.log("inside post item", comment);
                addComment({
                  variables: {
                    text: comment,
                    postId: post.id,
                  },
                });
              }}
            />
          )}
          <CommentList comments={[...comments, ...post.comments]} />
        </>
      )}
    </Card>
  );
};

export default PostListItem;
