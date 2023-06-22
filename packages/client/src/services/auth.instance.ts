import { ICreateUserDto } from "@/types/createUser.interface";
import { LoginUserDto } from "@/types/login.dto";
import { IUser } from "@/types/user.interface";
import { AxiosInstance } from "axios";

export const AuthService = (instance: AxiosInstance) => ({
  async getUser() {
    const { data } = await instance.get<Omit<IUser, "password">>(
      "/auth/profile"
    );
    return data;
  },
  async login(dto: LoginUserDto) {
    return await instance.post("/users/login", dto);
  },
  async register(dto: ICreateUserDto) {
    return await instance.post("/users/register", dto);
  },
});
