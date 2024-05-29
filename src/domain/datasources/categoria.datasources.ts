import {  CreateCategoriaDto, UpdateCategoriaDto } from '../dtos';
import { ChangeStatusCategoriaDto } from '../dtos/categoria/change-status-categoria.dto';
import { CategoriaEntity } from '../entities/categoria.entity';



export abstract class CategoriaDatasource {

  abstract create( createCategoriaDto: CreateCategoriaDto ): Promise<CategoriaEntity>;

  //todo: paginación
  abstract getAll(): Promise<CategoriaEntity[]>;
  abstract findById( id: number ): Promise<CategoriaEntity>;
  abstract findByName(nombre: string): Promise<CategoriaEntity | undefined>
  abstract updateById( updateCategoriaDto: UpdateCategoriaDto ): Promise<CategoriaEntity>;
  abstract deleteById( changeStatusCategoriaDto: ChangeStatusCategoriaDto ): Promise<CategoriaEntity>;

}