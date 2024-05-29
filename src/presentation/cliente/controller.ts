import { Request, Response } from "express";
import { ClienteRepository } from "../../domain/repositories/cliente.repository";
import { GetClientes } from "../../domain/use-cases/cliente/get-clientes";
import { GetCliente } from "../../domain/use-cases/cliente/get-cliente";
import { CreateClienteDto, UpdateClienteDto } from "../../domain";
import { CreateCliente } from "../../domain/use-cases/cliente/create-cliente";
import { UpdateCliente } from "../../domain/use-cases/cliente/update-cliente";
import { DeleteCliente } from "../../domain/use-cases/cliente/delete-cliente";
import { changeStatusClienteDto } from "../../domain/dtos/cliente/changestatus-cliente.dto";
import { error } from 'console';



export class ClienteController {

    //* DI
    constructor(
      private readonly clienteRepository: ClienteRepository,
    ) { }
  
  
    public getClientes= ( req: Request, res: Response ) => {
  
      new GetClientes( this.clienteRepository )
        .execute()
        .then( clientes => res.json( clientes ) )
        .catch( error => res.status( 400 ).json( { error } ) );
  
    };
  
    public getClienteById = ( req: Request, res: Response ) => {
      const id = +req.params.id;
      new GetCliente( this.clienteRepository )
        .execute( id )
        .then( cliente => res.json( cliente ) )
        .catch( error => res.status( 400 ).json( { error } ) );
  
    };
  
    public createCliente = ( req: Request, res: Response ) => {
      const [ error, createClienteDto ] = CreateClienteDto.create( req.body );
      if ( error ) return res.status( 400 ).json( { error } );
      new CreateCliente( this.clienteRepository )
        .execute( createClienteDto! )
        .then( cliente => res.json( cliente ) )
        .catch( error => res.status( 400 ).json( { error } ) );
    };
  
    public updateCliente = ( req: Request, res: Response ) => {
      const id = +req.params.id;
      const [ error, updateClienteDto ] = UpdateClienteDto.create( { ...req.body, id } );
      if ( error ) return res.status( 400 ).json( { error } );
  
      new UpdateCliente( this.clienteRepository )
        .execute( updateClienteDto! )
        .then( cliente => res.json( cliente ) )
        .catch( error => res.status( 400 ).json( { error } ) );
  
    };
  
  
    public deleteCliente = ( req: Request, res: Response ) => {
      const id = +req.params.id;

      const [error, updateClienteDto] =  changeStatusClienteDto.create({id, estado:0});
      if ( error ) return res.status( 400 ).json( { error } );
      new DeleteCliente( this.clienteRepository )
        .execute( updateClienteDto! )
        .then( todo => res.json( todo ) )
        .catch( error => res.status( 400 ).json( { error } ) );
    };

    public activateCliente = ( req: Request, res: Response ) => {
        const id = +req.params.id;
  
        const [error, updateClienteDto] =  UpdateClienteDto.create({id, estado:1});
        if ( error ) return res.status( 400 ).json( { error } );
        new UpdateCliente( this.clienteRepository )
          .execute( updateClienteDto! )
          .then( todo => res.json( todo ) )
          .catch( error => res.status( 400 ).json( { error } ) );
      };
  
  
  
  } 