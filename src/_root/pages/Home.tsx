import { Models } from "appwrite";


import { useGetRecentPosts } from "@/lib/react-query/queryesAndMutations";
import PostCard from "@/components/shared/PostCard";
import Loader from "@/components/shared/Loader";

const Home = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  if (isErrorPosts) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="h3-bold md:h2-bold text-left w-full">Home Feed</div>
        {isPostLoading && !posts ? (
          <Loader />
        ) : (
          <ul className="flex flex-col flex-1 gap-9 w-full">
            {posts?.documents.map((post: Models.Document) => (
              <li key={post.$id} className="flex justify-center w-full">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
