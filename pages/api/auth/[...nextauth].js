import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"


export const authOptions = {
    // Configure one or more authentication provider

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_FRONT_ID,
            clientSecret: process.env.GOOGLE_FRONT_SECRET,
        }),

    ],
    adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
