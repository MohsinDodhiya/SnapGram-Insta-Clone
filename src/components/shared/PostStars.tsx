import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queryesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";

type PostStarsProps = {
  post: Models.Document;
  userId: string;
};
const PostStars = ({ post, userId }: PostStarsProps) => {
  const likesList = post.likes?.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isLoading: isSaveingPost } = useSavePost();
  const { mutate: deleteSavedPost, isLoading: isDeletingPost } =
    useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  const savePostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savePostRecord); // savePostRecord ? true : false
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes]; // LIKES BY ALL USER_ID

    const hasLiked = newLikes.includes(userId); // ALREADY LIKE THEN CLICK RELIKE(MENS REMOVE LIKE)

    if (hasLiked) {
      newLikes = newLikes?.filter((id) => id !== userId); // FILTER AND REMOVE USER_ID
    } else {
      newLikes.push(userId); // ADD USER_ID
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savePostRecord) {
      setIsSaved(false);
      deleteSavedPost(savePostRecord.$id);
    } else {
      setIsSaved(true);
      savePost({ postId: post.$id, userId });
    }
  };
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          className="cursor-pointer"
          width={20}
          height={20}
          onClick={handleLikePost}
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {isSaveingPost || isDeletingPost ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="save"
            className="cursor-pointer"
            width={20}
            height={20}
            onClick={handleSavePost}
          />
        )}
      </div>
    </div>
  );
};

export default PostStars;
