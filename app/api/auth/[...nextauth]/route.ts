import { connectToDatabase } from "@config/database.config";
import User from "@models/User.model";
import NextAuth, { Awaitable, DefaultSession, Session, SessionOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

type Profile = {
  id?: string;
  email?: string;
  username?: string;
  image?: string;
  picture?: string;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.ID_CLIENT!,
      clientSecret: process.env.SECRET_KEY!,
    })
  ],
  callbacks: {
    async session(params: { session: Session }) {
      console.log("Verifying session");
      const userSession = await User.findOne({
        email: params.session.user?.email,
      });
    
      return {
        ...params.session,
        user: {
          ...params.session.user,
          id: userSession?._id,
        },
      };
    },
    async signIn(params: { profile?: Profile }) {
      console.log("Verifying sign in");
      try {
        const { profile } = params;
        await connectToDatabase()

        //check if a user already exists
        const userExist = await User.findOne({ email: profile?.email });

        // if not, create a new user
        if (!userExist) {
          await User.create({
            email: profile?.email,
            username: profile?.email?.split("@")[0],
            image: profile?.image || profile?.picture,
          })
        }
        return true;
        
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  }
})


export { handler as GET, handler as POST };
