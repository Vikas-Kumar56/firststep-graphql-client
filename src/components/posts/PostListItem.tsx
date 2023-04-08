import { FC } from "react";
import { Post } from "../common/commonTypes";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface Props {
  post: Post;
}

const PostListItem: FC<Props> = ({ post }) => {
  return (
    <Card sx={{ width: 500, mb: 5 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "space-between", ml: 1 }}>
        <Typography variant="subtitle2">
          Created by: {post.author.name}
        </Typography>
        <Button size="small" color="primary">
          Show Comments
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostListItem;
