// cleanAppwrite.ts
import { Client, Users, Databases, Storage, AppwriteException } from "node-appwrite";

// Config validation
const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  usersCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_USERS_ID,
  postsCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_POSTS_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_SAVES_ID,
  cleanUpServerApiKey: import.meta.env.VITE_APPWRITE_SERVER_API_KEY,
};

// Validate required config
if (!appwriteConfig.projectId || !appwriteConfig.cleanUpServerApiKey) {
  throw new Error("Missing required Appwrite configuration");
}

const client = new Client()
  .setEndpoint(appwriteConfig.appwriteUrl)
  .setProject(appwriteConfig.projectId)
  .setKey(appwriteConfig.cleanUpServerApiKey);

// ----------------------
// 🎯 TARGETED DELETION FUNCTIONS
// ----------------------

/**
 * Delete ALL users from Auth system
 */
const deleteAuthUsers = async (): Promise<number> => {
  const users = new Users(client);
  let deletedCount = 0;
  
  try {
    console.log("\n🔍 Listing auth users...");
    const { users: userList } = await users.list();
    
    for (const user of userList) {
      try {
        console.log(`🗑️ Deleting auth user: ${user.$id}`);
        await users.delete(user.$id);
        deletedCount++;
      } catch (err) {
        console.error(`❌ Failed to delete auth user ${user.$id}:`, 
          err instanceof AppwriteException ? err.message : err);
      }
    }
  } catch (err) {
    console.error("❌ Error listing auth users:", err);
  }
  
  return deletedCount;
};

/**
 * Delete ALL documents from specified collection
 */
const deleteCollectionDocuments = async (collectionId: string): Promise<number> => {
  const databases = new Databases(client);
  let deletedCount = 0;
  
  if (!appwriteConfig.databaseId || !collectionId) {
    console.log(`⏩ Skipping collection ${collectionId} - no databaseId configured`);
    return 0;
  }

  try {
    console.log(`\n🔍 Listing documents in ${collectionId}...`);
    const { documents } = await databases.listDocuments(
      appwriteConfig.databaseId, 
      collectionId
    );
    
    for (const doc of documents) {
      try {
        console.log(`🗑️ Deleting document: ${doc.$id}`);
        await databases.deleteDocument(
          appwriteConfig.databaseId,
          collectionId,
          doc.$id
        );
        deletedCount++;
      } catch (err) {
        console.error(`❌ Failed to delete document ${doc.$id}:`, 
          err instanceof AppwriteException ? err.message : err);
      }
    }
  } catch (err) {
    console.error(`❌ Error listing documents in ${collectionId}:`, err);
  }
  
  return deletedCount;
};

/**
 * Delete ALL files from storage bucket
 */
const deleteStorageFiles = async (): Promise<number> => {
  const storage = new Storage(client);
  let deletedCount = 0;
  
  if (!appwriteConfig.storageId) {
    console.log("⏩ Skipping storage files - no storageId configured");
    return 0;
  }

  try {
    console.log("\n🔍 Listing storage files...");
    const { files } = await storage.listFiles(appwriteConfig.storageId);
    
    for (const file of files) {
      try {
        console.log(`🗑️ Deleting file: ${file.name} (${file.$id})`);
        await storage.deleteFile(appwriteConfig.storageId, file.$id);
        deletedCount++;
      } catch (err) {
        console.error(`❌ Failed to delete file ${file.$id}:`,
          err instanceof AppwriteException ? err.message : err);
      }
    }
  } catch (err) {
    console.error("❌ Error listing storage files:", err);
  }
  
  return deletedCount;
};

// ----------------------
// 🚀 MAIN CLEANUP FUNCTION
// ----------------------
export const runCleanup = async (confirm: boolean = false): Promise<void> => {
  if (!confirm) {
    console.log("❌ Safety check: Pass confirm=true to execute cleanup");
    return;
  }

  console.log("\n=== STARTING APPWRITE CLEANUP ===");
  console.log("Project:", appwriteConfig.projectId);
  console.log("Endpoint:", appwriteConfig.appwriteUrl);

  try {
    // 1. Delete Auth Users
    const authUsersDeleted = await deleteAuthUsers();
    console.log(`\n✅ Deleted ${authUsersDeleted} auth users`);

    // 2. Delete Storage Files
    const filesDeleted = await deleteStorageFiles();
    console.log(`\n✅ Deleted ${filesDeleted} storage files`);

    // 3. Delete Database Documents
    const collections = {
      Users: appwriteConfig.usersCollectionId,
      Posts: appwriteConfig.postsCollectionId,
      Saves: appwriteConfig.savesCollectionId
    };

    let totalDocsDeleted = 0;
    for (const [name, id] of Object.entries(collections)) {
      if (!id) continue;
      
      const count = await deleteCollectionDocuments(id);
      console.log(`\n✅ Deleted ${count} documents from ${name} collection`);
      totalDocsDeleted += count;
    }

    console.log(`\n=== CLEANUP COMPLETE ===`);
    console.log(`- Auth Users: ${authUsersDeleted}`);
    console.log(`- Storage Files: ${filesDeleted}`);
    console.log(`- Database Documents: ${totalDocsDeleted}`);
  } catch (err) {
    console.error("\n❌ CLEANUP FAILED:", err);
    process.exit(1);
  }
};

// Run if executed directly
if (require.main === module) {
  runCleanup(true).catch(err => {
    console.error("❌ Fatal error:", err);
    process.exit(1);
  });
}

export default {
  runCleanup,
  deleteAuthUsers,
  deleteStorageFiles,
  deleteCollectionDocuments
};