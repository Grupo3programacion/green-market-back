import { ProductoEntity } from '../../entities/producto.entity';
import { TodoEntity } from '../../entities/todo.entity';
import { ProductoRepository } from '../../repositories/producto.repository';
import { TodoRepository } from '../../repositories/todo.repository';


export interface GetProductoUseCase {
  execute( id: number ): Promise<ProductoEntity>
}


export class GetProducto implements GetProductoUseCase {
  
  constructor(
    private readonly repository: ProductoRepository,
  ) {}
  
  execute( id: number ): Promise<ProductoEntity> {
    return this.repository.findById(id);
  }

}