import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(rawPassword, salt);
}