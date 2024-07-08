import conf from "../conf/conf";
import { Client, ID, Query, Databases, Storage } from "appwrite";

export class Service {
    client = new Client()
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // unique document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // unique document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // unique document ID
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // unique document ID
            )
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error",error);
        }
    }

    // Query sirf indexes par chal sakti hain ig jo tumne banaya hoga appwrite k database but attributes pe bhi kaam kar sakta hai ig bcz docs me likha tha .. padh lena
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error",error);
            return false
        }
    }

    // Storage Unit

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error",error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error",error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service;