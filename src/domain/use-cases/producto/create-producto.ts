import { CreateClienteDto, CreateProductoDto,  } from '../../dtos';
import { ClienteEntity } from '../../entities/cliente.entity';
import { ProductoEntity } from '../../entities/producto.entity';
import { CustomError } from '../../errors/custom.error';
import { CategoriaRepository } from '../../repositories/categoria.repository';
import { ProductoRepository } from '../../repositories/producto.repository';


export interface CreateProductoUseCase {
  execute( dto: CreateProductoDto ): Promise<ProductoEntity>
}

export class CreateProducto implements CreateProductoUseCase {
  
  constructor(
    private readonly repository: ProductoRepository,
    private readonly catRepository: CategoriaRepository
  ) {}
  
   async execute( dto: CreateProductoDto ): Promise<ProductoEntity> {

    
    const productoName = await this.repository.findByName(dto.nombreProducto);
    const categoria = await this.catRepository.findById(dto.idCategoria);

    

      if(productoName != null && productoName.estado == 1)
        throw CustomError.resourceExists('Un producto con este nombre ya existe');

      if(!categoria)
        throw CustomError.resourceExists('la categoria no existe');

      if(dto.cantidad <= 0)
        throw CustomError.resourceExists('la cantidad debe ser mayor a cero');

      console.log("Eyyyy Manoo");

      console.log(dto);

      return this.repository.create(dto);
  }

}