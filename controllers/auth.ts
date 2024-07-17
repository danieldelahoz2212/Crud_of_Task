import bcrypt from "bcrypt";

export const encrypt = async (pass: string) => {
    const hash = await bcrypt.hash(pass, 10);
    return hash;
}

export const compare = async(pass: string, hashPass:string) => {
    return await bcrypt.compare(pass, hashPass);
}