import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    email?: string;
    username?: string;
    role?: string;
    preferences?: { theme: string; notifications: boolean };
    lastLogin?: Date;
  }
  interface Session {
    user: {
      _id?: string;
      email?: string;
      username?: string;
      role?: string;
      preferences?: { theme: string; notifications: boolean };
      lastLogin?: Date;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    username?: string;
    role?: string;
    preferences?: { theme: string; notifications: boolean };
    lastLogin?: Date;
  }
}
