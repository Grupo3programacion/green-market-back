import { ProductoEntity } from '../../entities/producto.entity';
import { ProductoRepository } from '../../repositories/producto.repository';


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