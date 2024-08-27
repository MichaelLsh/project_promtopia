import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from '@utils/database';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({session}) {
            // store the user id from MongoDB to session
            const sessionUser = await User.findOne({email: session.user.email});
    
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({profile}) {
            try {
                // every NextJS route is serverless
                await connectToDB();
    
                // check if user exists in the database
                const userExists = await User.findOne({email: profile.email});
    
                // if not, create a new user and save it to the database
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
    
                return true;
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        }
    }
   
});

export {handler as GET, handler as POST};