import { hashPassword } from "../../../helpers/auth";
import { createUser, getUserHasExist } from "../../../helpers/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;
    if (!email || email.trim() === "" || !password || password.trim() === "") {
      res.status(422).json({
        message: "Invalids entered inputs",
      });
      return;
    }

    const response = await getUserHasExist(email);
    if(response){
        res.status(422).json({
            message: "Usuário já existe",
          });
        return;
    }
  
    const hasPassword = await hashPassword(password);
    const newUser = {
      email: email,
      password: hasPassword,
    };
    await createUser(newUser);
  }
  return;
}

export default handler;
