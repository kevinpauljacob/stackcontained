import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import connectDatabase from "@/utils/connect";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "johndoe",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDatabase();
        try {
          const user = await User.findOne({ username: credentials.username });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );

          if (!isValidPassword) {
            throw new Error("Incorrect email or password");
          } else {
            return user;
          }
        } catch (err: any) {
          throw new Error(err.message);
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // async signIn({ user, account }: { user: AuthUser; account: Account }) {
    //   if (account?.provider == "credentials") {
    //     return true;
    //   }
    //   if (account?.provider == "github") {
    //     await connectDatabase();
    //     try {
    //       const existingUser = await User.findOne({ email: user.email });
    //       if (!existingUser) {
    //         const newUser = new User({
    //           email: user.email,
    //           name: user.name,
    //           username: user.id,
    //         });

    //         await newUser.save();
    //         return true;
    //       }
    //       return true;
    //     } catch (err) {
    //       console.log("Error saving user", err);
    //       return false;
    //     }
    //   }
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id?.toString();
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
        token.preferences = user.preferences;
        token.lastLogin = user.lastLogin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
});
