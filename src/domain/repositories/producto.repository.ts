import {  CreateProductoDto, UpdateProductoDto,  } from '../dtos';
import { changeStatusProductoDto } from '../dtos/producto/change-state-producto.dto';
import { ChangeUnityProductoDto } from '../dtos/producto/change-unity-producto';
import { ProductoEntity } from '../entities/producto.entity';





export abstract class ProductoRepository {

  abstract create( createProductoDto: CreateProductoDto ): Promise<ProductoEntity>;
  //todo: paginación
  abstract getAll(): Promise<ProductoEntity[]>;
  abstract findById( id: number ): Promise<ProductoEntity>;
  abstract findByName(nombre: string): Promise<ProductoEntity | undefined>
  abstract updateById( updateProductoDto: UpdateProductoDto ): Promise<ProductoEntity>;
  abstract deleteById( changeStatusProductoDto : changeStatusProductoDto ): Promise<ProductoEntity | null>;
  abstract addUnity(changeUnityProductoDto : ChangeUnityProductoDto ): Promise<ProductoEntity>; 
  abstract activateProducto ( changeStatusProductoDto : changeStatusProductoDto ): Promise<ProductoEntity>;
  abstract getByFechas(fechaIni: Date, fechaFin: Date): Promise<ProductoEntity[]>;

}