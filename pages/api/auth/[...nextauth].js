import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { comparePassword } from "../../../helpers/auth";
import { getUserHasExist } from "../../../helpers/db";

export default NextAuth({
  session: {
      jwt: true
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const user = await getUserHasExist(credentials.email);
        if (!user) {
          throw new Error("No user found");
        }
        const passwordIsEqual = await comparePassword(
          credentials.password,
          user.user.password
        );
        if (!passwordIsEqual) {
          throw new Error("Password not confere");
        }

        return {
            email: user.user.email
        };
      },
    }),
  ],
});
