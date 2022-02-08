import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserRepositories } from '../repositories/UsersRepositories';


interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({email, password}: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UserRepositories);

        const user = await usersRepository.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email/Password incorrect")

        }

        const token = sign({
            email: user.email
        }, "9e11722533781a201ea9debcf44e7a26",{
            subject: user.id,
            expiresIn:"1d",
        });

        return token;




    }



}

export{AuthenticateUserService};
