import { hash, compare } from "bcryptjs";
export async function hashPassword(password) {
    const hasPassword = await hash(password, 12);
    return hasPassword;
}

export async function comparePassword(password, hasPassword){
    const res = await compare(password, hasPassword)
    return res;
}
