import { Request, Response } from "express";
import { CategoriaRepository } from "../../domain/repositories/categoria.repository";
import { GetCategorias } from "../../domain/use-cases/categoria/get-categorias";
import { GetCategoria } from "../../domain/use-cases/categoria/get-categoria";
import { CreateCategoria } from "../../domain/use-cases/categoria/create-categoria";
import { CreateCategoriaDto, UpdateCategoriaDto } from "../../domain";
import { UpdateCategoria } from "../../domain/use-cases/categoria/update-categoria";
import { changeStatusClienteDto } from "../../domain/dtos/cliente/changestatus-cliente.dto";
import { DeleteCategoria } from "../../domain/use-cases/categoria/delete-categoria";
import { ChangeStatusCategoriaDto } from '../../domain/dtos/categoria/change-status-categoria.dto';


export class CategoriaController {

    //* DI
    constructor(
      private readonly categoriaRepository: CategoriaRepository,
    ) { }
  
  
    public getCategorias= ( req: Request, res: Response ) => {
  
      new GetCategorias( this.categoriaRepository )
        .execute()
        .then( categorias => res.json( categorias ) )
        .catch( error => res.status( 400 ).json( { error } ) );
  
    };
  
    public getCategoriaById = ( req: Request, res: Response ) => {
      const id = +req.params.id;
      new GetCategoria( this.categoriaRepository )
        .execute( id )
        .then( categoria => res.json( categoria ) )
        .catch( error => res.status( 400 ).json( { error } ) );
  
    };
  
    public createCategoria = ( req: Request, res: Response ) => {

      console.log("Eyyy");

      console.log(req.body);

      const [ error, createCategoriaDto ] = CreateCategoriaDto.create( req.body );
      if ( error ) return res.status( 400 ).json( { error } );

      console.log("Estoy aqui");

      new CreateCategoria( this.categoriaRepository )
        .execute( createCategoriaDto! )
        .then( categoria => res.json( categoria ) )
        .catch( error => res.status( 400 ).json( { error } ) );
    };
  
    public updateCategoria = ( req: Request, res: Response ) => {
      const id = +req.params.id;
      const [ error, updateCategoriaDto ] = UpdateCategoriaDto.create( { ...req.body, id } );
      if ( error ) return res.status( 400 ).json( { error } );
  
      new UpdateCategoria( this.categoriaRepository )
        .execute( updateCategoriaDto! )
        .then( categoria => res.json( categoria ) )
        .catch( error => res.status( 400 ).json( { error } ) );
  
    };
  
  
    public deleteCategoria = ( req: Request, res: Response ) => {
      const id = +req.params.id;

      const [ error, eliminarCategoriaDto ] = ChangeStatusCategoriaDto.create( {id,estado:0 } );

      if ( error ) return res.status( 400 ).json( { error } );
      
      new DeleteCategoria( this.categoriaRepository )
        .execute( eliminarCategoriaDto! )
        .then( todo => res.json( todo ) )
        .catch( error => res.status( 400 ).json( { error } ) );
    };  
  } 