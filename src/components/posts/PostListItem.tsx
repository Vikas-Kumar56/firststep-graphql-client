import { FC, useState } from "react";
import { Post } from "../common/commonTypes";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import CommentList from "../commmets/CommentList";

interface Props {
  post: Post;
}

const PostListItem: FC<Props> = ({ post }) => {
  const [showcomment, setShowComment] = useState(false);
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
          onClick={() => setShowComment(true)}
          size="small"
          color="secondary"
          variant="contained"
        >
          Show Comments
        </Button>
      </CardActions>
      {showcomment && (
        <>
          <Divider />
          <CommentList comments={post.comments} />
        </>
      )}
    </Card>
  );
};

export default PostListItem;
