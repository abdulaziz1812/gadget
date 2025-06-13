import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/src/lib/dbConnect";

export const authOptions = {
providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter Email" },
      password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
       
        const usersCollection = dbConnect("users");

        const user = await usersCollection.findOne({ email: credentials.email });
        
      

        if (!user) throw new Error("No user found with this email");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Incorrect password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

   
    
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      const usersCollection = await dbConnect("users");

      const provider = account.provider; // e.g., "google", "github", "credentials"

      const filter =
        provider === "credentials"
          ? { email: user.email }
          : { providerAccountId: account.providerAccountId, provider };

      const existingUser = await usersCollection.findOne(filter);

      if (!existingUser) {
        const newUser = {
          name: user.name || "",
          email: user.email || "",
          image: user.image || "",
          provider: provider, // store "google", "github", or "credentials"
          providerAccountId: account.providerAccountId || null,
          createdAt: new Date(),
        };

        await usersCollection.insertOne(newUser);
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}


const handler = NextAuth(authOptions)
  

export { handler as GET, handler as POST };
