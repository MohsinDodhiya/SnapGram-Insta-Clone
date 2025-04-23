import { Models } from "appwrite";
import { useState } from "react";
import {
  useGetRecentPosts,
  useGetUsers,
} from "@/lib/react-query/queryesAndMutations";
import PostCard from "@/components/shared/PostCard";
import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { runCleanupFromClient } from "@/scripts/HandleClenan";

type CleanupStatus = {
  isDeleting: boolean;
  progress: {
    filesDeleted: number;
    postsDeleted: number;
    savesDeleted: number;
    totalFiles: number;
    totalPosts: number;
    totalSaves: number;
  };
};

const Home = () => {
  const [cleanupStatus, setCleanupStatus] = useState<CleanupStatus>({
    isDeleting: false,
    progress: {
      filesDeleted: 0,
      postsDeleted: 0,
      savesDeleted: 0,
      totalFiles: 0,
      totalPosts: 0,
      totalSaves: 0
    }
  });

  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  const {
    data: creaters,
    isLoading: isCreatersLoading,
    isError: isErrorCreaters,
  } = useGetUsers(10);

  const handleCleanup = async () => {
    if (
      confirm(
        "Are you sure you want to delete all data? This cannot be undone."
      )
    ) {
      try {
        setCleanupStatus(prev => ({
          ...prev,
          isDeleting: true
        }));
        
        await runCleanupFromClient({
          onProgress: (progress) => {
            setCleanupStatus(prev => ({
              ...prev,
              progress
            }));
          }
        });
        
        alert("Cleanup completed successfully!");
        window.location.reload(); 
      } catch (error) {
        console.error("Cleanup error:", error);
        alert("Failed to run cleanup. See console for details.");
      } finally {
        setCleanupStatus(prev => ({
          ...prev,
          isDeleting: false
        }));
      }
    }
  };

  const renderCleanupProgress = () => {
    const { progress } = cleanupStatus;
    
    if (!cleanupStatus.isDeleting) return null;
    
    return (
      <div className="mt-2 p-2 bg-gray-800 rounded-lg text-xs">
        <div>Posts: {progress.postsDeleted}/{progress.totalPosts}</div>
        <div>Files: {progress.filesDeleted}/{progress.totalFiles}</div>
        <div>Saves: {progress.savesDeleted}/{progress.totalSaves}</div>
      </div>
    );
  };

  if (isErrorPosts || isErrorCreaters) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <div className="flex items-center justify-between w-full">
            <div className="h3-bold md:h2-bold text-left">Home Feed</div>
            <div style={{ display: 'none' }}>
              <button
                onClick={handleCleanup}
                disabled={cleanupStatus.isDeleting}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {cleanupStatus.isDeleting ? "Cleaning..." : "Clean Database"}
              </button>
              {renderCleanupProgress()}
            </div>
          </div>

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

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isCreatersLoading && !creaters ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creaters?.documents.map((creater) => (
              <li key={creater.$id}>
                <UserCard user={creater} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;