import NextAuth, { DefaultSession, DefaultJWT, DefaultUser, DefaultProfile } from "next-auth"
import { OsuUser } from "./user";

declare module "next-auth" {  
  interface User extends OsuUser {}
  interface Profile extends OsuUser {}

  interface Session {
    osu?: OsuUser,
    access_token?: string,
  };
}

declare module "next-auth/next" {
  interface Session {
    osu?: OsuUser,
    access_token?: string,
  };
}

declare module "next-auth/jwt" {
  interface JWT {
    osu?: User,
    access_token?: string
  };
}