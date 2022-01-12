import { getSession } from "next-auth/client";
import { comparePassword } from "../../../helpers/auth";
import { allUsers, changePasswordUser, getUserHasExist } from "../../../helpers/db";


async function handler(req, res){
    if(req.method !== 'PATCH'){
        return;
    }

    const session = await getSession({req: req})

    if(!session){
        res.status(401).json({message: 'Nenhum usuário conectado'})
        return;
    } //rota protegida

    const email = session.user.email;
    const {password, newPassword} = req.body;

    const userExist = await getUserHasExist(email);


    if(!userExist){
        res.status(401).json({message: 'Algo de errado aconteceu'})
        return;
    }
    
    const currentPassword = userExist.user.password;
    const comparePasswordF = await comparePassword(password,currentPassword);
    console.log(password, currentPassword)
    if(!comparePasswordF){
        res.status(403).json({message: 'Senhas não conferem'})
        return;
    }

    
    console.log( await changePasswordUser(newPassword, userExist.id))




}

export default handler;