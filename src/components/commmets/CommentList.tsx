import { Box } from "@mui/material";
import { FC } from "react";
import CommentListItem from "./CommentListItem";
import { Comment } from "../common/commonTypes";

interface Props {
  comments: Comment[];
}

const CommentList: FC<Props> = ({ comments }) => {
  return (
    <Box>
      {comments.map((comment) => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}
    </Box>
  );
};

export default CommentList;
