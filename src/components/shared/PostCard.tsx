import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStars from "./PostStars";

type PostCardProps = {
  post: Models.Document;
};
const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  if (!post.creater) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creater.$id}`}>
            <img
              src={
                post?.creater?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              loading="lazy"
              alt="creater"
              className="rounded-full w-12 lg:h12"
            />
          </Link>
          <div className="flec flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creater.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {multiFormatDateString(post.$createdAt)}
              </p>
              {" - "}
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creater.$id && "hidden"}`}
        >
          <img src="/assets/icons/edit.svg" loading="lazy" alt="edit" width={20} height={20} />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => {
              <li key={tag} className="text-light-3">
                #{tag}
              </li>;
            })}
          </ul>
        </div>
        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          loading="lazy"
          alt="post image"
          className="post-card_img"
        />
      </Link>
      <PostStars post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
