import { FC } from "react";
import { Comment } from "../common/commonTypes";
import { Box } from "@mui/material";
import CommentListItem from "./CommentListItem";

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
