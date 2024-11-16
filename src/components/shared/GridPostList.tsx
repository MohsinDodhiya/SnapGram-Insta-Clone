import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import PostStars from "./PostStars";
import { Link } from "react-router-dom";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          {/* Post Link */}
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="Post"
              className="h-full w-full object-cover"
            />
          </Link>
          {/* User and Stats Section */}
          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={post.creater.imageUrl}
                  alt="Creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creater.name}</p>
              </div>
            )}
            {showStats && user && <PostStars post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
