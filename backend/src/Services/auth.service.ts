import Users from "../Model/Users";
import bcrypt from "bcrypt";
import UsersRepository from "../Repository/Users.repository";
import jwt from "jsonwebtoken";

const salt = 10;
const JWT_SECRET = process.env.JWT_SECRET!;
const EXPIRES_IN = "1h";
const repo = new UsersRepository();

export default class AuthService {
  async hashPassword(input: Users) {
    try {
      const password_hash = await bcrypt.hash(input.password, salt);
      const user = await repo.createUser({
        name: input.name,
        email: input.email,
        password: password_hash,
        perfil_id: Number(input.perfil_id),
        active: input.active,
      });
      return user;
    } catch (error) {
      console.log("Error no hashing");
    }
  }

  async updatePassword(userId: number, password: string) {
    try {
      const new_password = await bcrypt.hash(password, salt);
      const updatedPassword = await repo.updateUser(userId, new_password);
      return updatedPassword;
    } catch (error) {
      console.log("Error no update");
    }
  }

  async login(email: string, password: string) {
    const status_email = await repo.getByEmail(email);
    if (!status_email) {
      return "Email inválido";
    }

    const status_password = await bcrypt.compare(
      password,
      status_email.password
    );
    if (!status_password) {
      return "Senha inválida";
    }

    const token = jwt.sign(
      {
        sub: String(status_email.id),
        perfil_id: status_email.perfil_id,
        name: status_email.name,
      },
      JWT_SECRET,
      { expiresIn: EXPIRES_IN }
    );
    const { password: _omit, ...publicUser } = status_email;

    return { ok: true, token, user: publicUser };

  }

  
}
