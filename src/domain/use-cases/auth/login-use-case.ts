import { JwtAdapter } from "../../../config/jwt.adapter";
import { LoginUserDto } from "../../dtos/login/loginUsert.dto";
import { ClienteEntity } from "../../entities/cliente.entity";
import { CustomError } from "../../errors/custom.error";
import { ClienteRepository } from "../../repositories/cliente.repository";

export class LoginUsesCase {


    constructor(
        private readonly repository: ClienteRepository,
    ) { }


    public async execute(loginUserDto: LoginUserDto): Promise<any> {

        const moderador = {
            id: 777,
            nombre: "superMiguel",
            telefono: "3006386989",
            correo: "superMiguel@hotmail.com",
            clave: "123456",
            estado: "1"
        };



        if (moderador.correo == loginUserDto.email) {

            if (loginUserDto.password != moderador.clave)
                throw CustomError.badRequest('Clave incorrecta');

            const token = await JwtAdapter.generateToken({ id: moderador.id, email: moderador.clave, rol: "MODERADOR" });
            if (!token) throw CustomError.internalServer('Error while creating JWT');

            return {
                user: moderador,
                token: token,
            }
        }
        else {

            const user = await this.repository.obtenerByCorreo(loginUserDto.email);

            if (!user)
                throw CustomError.badRequest('Email no registrado');

            if (loginUserDto.password != user.clave)
                throw CustomError.badRequest('Clave incorrecta');

            const { clave, ...userEntity } = ClienteEntity.fromObject(user);

            const token = await JwtAdapter.generateToken({ id: user.id, email: user.clave, rol: "CLIENTE" });
            if (!token) throw CustomError.internalServer('Error while creating JWT');

            return {
                user: userEntity,
                token: token,
            }

        }










    }

}


// const isMatching = bcryptAdapter.compare( loginUserDto.password, user.password );
// if ( !isMatching ) throw CustomError.badRequest('Password is not valid');