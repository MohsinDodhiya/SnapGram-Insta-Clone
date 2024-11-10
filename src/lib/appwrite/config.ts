import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  usersCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_USERS_ID,
  postsCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_POSTS_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_SAVES_ID,
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.appwriteUrl);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
