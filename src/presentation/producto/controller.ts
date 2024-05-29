import { Request, Response } from 'express';
import { ProductoRepository } from '../../domain/repositories/producto.repository';
import { GetProductos } from '../../domain/use-cases/producto/get-productos';
import { GetProducto } from '../../domain/use-cases/producto/get-producto';
import { CreateProductoDto, UpdateProductoDto } from '../../domain';
import { CreateProducto } from '../../domain/use-cases/producto/create-producto';
import { CategoriaRepository } from '../../domain/repositories/categoria.repository';
import { UpdateProducto } from '../../domain/use-cases/producto/update-producto';
import { DeleteProducto } from '../../domain/use-cases/producto/delete-producto';
import { changeStatusProductoDto } from '../../domain/dtos/producto/change-state-producto.dto';
import { GetProductosByFechasUseCase } from '../../domain/use-cases/producto/get-byFechas';



export class ProductoController {

  //* DI
  constructor(
    private readonly productoRepository: ProductoRepository,
    private readonly categoriaRepository: CategoriaRepository
  ) { }


  public getProductos = ( req: Request, res: Response ) => {

    new GetProductos( this.productoRepository )
      .execute()
      .then( productos => res.json( productos ) )
      .catch( error => res.status( 400 ).json( { error } ) );

  };

  public getProductoById = ( req: Request, res: Response ) => {
    const id = +req.params.id;

    new GetProducto( this.productoRepository )
      .execute( id )
      .then( producto => res.json( producto ) )
      .catch( error => res.status( 400 ).json( { error } ) );

  };

  public createProducto = ( req: Request, res: Response ) => {
    const [ error, createProductoDto ] = CreateProductoDto.create( req.body );
    if ( error ) return res.status( 400 ).json( { error } );

    console.log("Eyyy");
    new CreateProducto( this.productoRepository, this.categoriaRepository )
      .execute( createProductoDto! )
      .then( producto => res.json( producto ) )
      .catch( error => res.status( 400 ).json( { error } ) );


  };

  public updateProducto = ( req: Request, res: Response ) => {
    const id = +req.params.id;
    const [ error, updateProductoDto ] = UpdateProductoDto.create( { ...req.body, id } );
    if ( error ) return res.status( 400 ).json( { error } );

    new UpdateProducto( this.productoRepository )
      .execute( updateProductoDto! )
      .then( producto => res.json( producto ) )
      .catch( error => res.status( 400 ).json( { error } ) );
  };


  public deleteProducto = ( req: Request, res: Response ) => {
    const id = +req.params.id;

    const [error, deleteProductoDto] =  changeStatusProductoDto.create({id, estado:0});
        if ( error ) return res.status( 400 ).json( { error } );

    new DeleteProducto( this.productoRepository )
      .execute( deleteProductoDto! )
      .then( producto => res.json( producto ) )
      .catch( error => res.status( 400 ).json( { error } ) );

  };

  public activateProducto = ( req: Request, res: Response ) => {
    const id = +req.params.id;

    const [error, updateProductoDto] =  UpdateProductoDto.create({id, estado:1});
        if ( error ) return res.status( 400 ).json( { error } );

    new UpdateProducto( this.productoRepository )
      .execute( updateProductoDto! )
      .then( producto => res.json( producto ) )
      .catch( error => res.status( 400 ).json( { error } ) );

  };

  public addUnity = ( req: Request, res: Response ) => {
    const id = +req.params.id;

    const [error, updateProductoDto] =  UpdateProductoDto.create( { ...req.body, id } );

    if ( error ) return res.status( 400 ).json( { error } );

    new UpdateProducto( this.productoRepository )
      .execute( updateProductoDto! )
      .then( producto => res.json( producto ) )
      .catch( error => res.status( 400 ).json( { error } ) );

  };

  public getProductosFechas = (req: Request, res: Response) => {
   const  {fechaIni, fechaFin} = req.body;    

    new GetProductosByFechasUseCase( this.productoRepository )
      .execute(fechaIni, fechaFin)
      .then( productos => res.json( productos ) )
      .catch( error => res.status( 400 ).json( { error } ) );
  }
} 