import { UpdateCategoriaDto} from '../../dtos';
import { CategoriaEntity } from '../../entities/categoria.entity';
import { CustomError } from '../../errors/custom.error';
import { CategoriaRepository } from '../../repositories/categoria.repository';


export interface UpdateCategoriaUseCase {
  execute( dto: UpdateCategoriaDto ): Promise<CategoriaEntity>
}


export class UpdateCategoria implements UpdateCategoriaUseCase {
  
  constructor(
    private readonly repository: CategoriaRepository,
  ) {}
  
  async execute( dto: UpdateCategoriaDto ): Promise<CategoriaEntity> {

    const category = await this.repository.findById(dto.id);

    if(!category)
      throw CustomError.resourceExists('Este id no esta registrado');

    if(category.estado == 0)
      throw CustomError.resourceExists('Este elemento ya fue eliminado');
    
    return this.repository.updateById(dto);
  }

}