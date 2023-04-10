import { FC } from "react";
import { Comment } from "../common/commonTypes";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person3Rounded";

interface Props {
  comment: Comment;
}

const CommentListItem: FC<Props> = ({ comment }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {comment.author.name}
        </Typography>
        <Typography variant="body2">{comment.text}</Typography>
      </ListItemText>
    </ListItem>
  );
};

export default CommentListItem;
