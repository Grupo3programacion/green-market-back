import { changeStatusProductoDto } from '../../dtos/producto/change-state-producto.dto';
import { ProductoEntity } from '../../entities/producto.entity';
import { CustomError } from '../../errors/custom.error';
import { ProductoRepository } from '../../repositories/producto.repository';


export interface DeleteProductoUseCase {
  execute( prod: changeStatusProductoDto ): Promise<ProductoEntity | null>
}


export class DeleteProducto implements DeleteProductoUseCase {
  
  constructor(
    private readonly repository: ProductoRepository,
  ) {}
  
  async execute( prod: changeStatusProductoDto ):Promise<ProductoEntity | null> {

    const producto = await this.repository.findById(prod.id);

    if(!producto)
      throw CustomError.resourceExists('Este id no esta registrado');

    if(producto.estado == 0)
      throw CustomError.resourceExists('Este producto ya fue eliminado');

    return this.repository.deleteById(prod);

  }

}