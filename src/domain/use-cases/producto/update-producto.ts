import { UpdateProductoDto } from '../../dtos';
import { ProductoEntity } from '../../entities/producto.entity';
import { CustomError } from '../../errors/custom.error';
import { ProductoRepository } from '../../repositories/producto.repository';


export interface UpdateProductoUseCase {
  execute( dto: UpdateProductoDto ): Promise<ProductoEntity>
}


export class UpdateProducto implements UpdateProductoUseCase {
  
  constructor(
    private readonly repository: ProductoRepository,
  ) {}
  
  async execute( dto: UpdateProductoDto ): Promise<ProductoEntity> {

    
    const producto = await this.repository.findById(dto.id);

    if(!producto)
      throw CustomError.resourceExists('Esta codigo de producto no esta registrada');

    if(producto.estado == 0)
      throw CustomError.resourceExists('Este producto ya fue eliminado');
    
    return this.repository.updateById(dto);

  }

}