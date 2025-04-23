import { Client, Databases, Storage, AppwriteException } from "appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";

type CleanupProgress = {
  filesDeleted: number;
  postsDeleted: number;
  savesDeleted: number;
  totalFiles: number;
  totalPosts: number;
  totalSaves: number;
};

type CleanupOptions = {
  onProgress?: (progress: CleanupProgress) => void;
};

// This function will run in the client but only use client-side allowed operations
export const runCleanupFromClient = async (options?: CleanupOptions): Promise<boolean> => {
  const progress: CleanupProgress = {
    filesDeleted: 0,
    postsDeleted: 0,
    savesDeleted: 0,
    totalFiles: 0,
    totalPosts: 0,
    totalSaves: 0
  };
  
  try {
    // For client-side, we can only use endpoints that don't require admin privileges
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(appwriteConfig.projectId);
    
    const storage = new Storage(client);
    const databases = new Databases(client);
    
    // Get user's posts
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId
    );
    
    progress.totalPosts = posts.documents.length;
    options?.onProgress?.(progress);
    
    // Delete each post and its associated file
    for (const post of posts.documents) {
      // Delete the associated file first
      if (post.imageId) {
        try {
          await storage.deleteFile(appwriteConfig.storageId, post.imageId);
          console.log(`Deleted file: ${post.imageId}`);
          progress.filesDeleted++;
          options?.onProgress?.(progress);
        } catch (error) {
          if (error instanceof AppwriteException) {
            console.error(`Appwrite Error (${error.code}) deleting file ${post.imageId}: ${error.message}`);
          } else {
            console.error(`Error deleting file ${post.imageId}:`, error);
          }
        }
      }
      
      // Delete the post document
      try {
        await databases.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.postsCollectionId,
          post.$id
        );
        console.log(`Deleted post: ${post.$id}`);
        progress.postsDeleted++;
        options?.onProgress?.(progress);
      } catch (error) {
        if (error instanceof AppwriteException) {
          console.error(`Appwrite Error (${error.code}) deleting post ${post.$id}: ${error.message}`);
        } else {
          console.error(`Error deleting post ${post.$id}:`, error);
        }
      }
    }
    
    // Get user's saved posts
    const saves = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId
    );
    
    progress.totalSaves = saves.documents.length;
    options?.onProgress?.(progress);
    
    // Delete each saved post
    for (const save of saves.documents) {
      try {
        await databases.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.savesCollectionId,
          save.$id
        );
        console.log(`Deleted saved post: ${save.$id}`);
        progress.savesDeleted++;
        options?.onProgress?.(progress);
      } catch (error) {
        if (error instanceof AppwriteException) {
          console.error(`Appwrite Error (${error.code}) deleting saved post ${save.$id}: ${error.message}`);
        } else {
          console.error(`Error deleting saved post ${save.$id}:`, error);
        }
      }
    }
    
    console.log("Cleanup completed successfully!");
    return true;
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error(`Appwrite Error (${error.code}): ${error.message}`);
    } else {
      console.error("Cleanup error:", error);
    }
    throw error;
  }
};