
import { ProductoEntity } from '../../entities/producto.entity';
import { ProductoRepository } from '../../repositories/producto.repository';


export interface GetProductoUseCase {
  execute(): Promise<ProductoEntity[]>
}


export class GetProductos implements GetProductoUseCase {
  
  constructor(
    private readonly repository: ProductoRepository,
  ) {}
  
  async execute(): Promise<ProductoEntity[]> {

    const productos = await this.repository.getAll()
    console.log(productos);

    return this.repository.getAll();
  }

}