import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { LoginUserDto } from "../../domain/dtos/login/loginUsert.dto";
import { LoginUsesCase } from "../../domain/use-cases/auth/login-use-case";
import { ClienteRepository } from "../../domain/repositories/cliente.repository";


export class AuthController {

    // DI
    constructor(

        private readonly clienteRepository: ClienteRepository
    ) {}
  
    private handleError = (error: unknown, res: Response ) => {
      if ( error instanceof CustomError ) {
        return res.status(error.statusCode).json({ error: error.message });
      }
  
      console.log(`${ error }`);
      return res.status(500).json({ error: 'Internal server error' })
    } 
  
  
    // registerUser = (req: Request, res: Response) => {
    //   const [error, registerDto] = RegisterUserDto.create(req.body);
    //   if ( error ) return res.status(400).json({error})
  
  
    //   this.authService.registerUser(registerDto!)
    //     .then( (user) => res.json(user) )
    //     .catch( error => this.handleError(error, res) );
        
    // }
  
    loginUser = (req: Request, res: Response) => {
  
      const [error, loginUserDto] = LoginUserDto.create(req.body);
      if ( error ) return res.status(400).json({error})
  
  
        new LoginUsesCase(this.clienteRepository)
        .execute(loginUserDto!)
        .then( (user) => res.json(user) )
        .catch( error => this.handleError(error, res) );
        
    }
  
  
  
    // validateEmail = (req: Request, res: Response) => {
  
    //   res.json('validateEmail');
    // }
  
  
  
  }