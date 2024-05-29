import { CategoriaEntity } from '../../entities/categoria.entity';
import { CustomError } from '../../errors/custom.error';
import { CategoriaRepository } from '../../repositories/categoria.repository';
import { ChangeStatusCategoriaDto } from '../../dtos/categoria/change-status-categoria.dto';


export interface DeleteCategoriaUseCase {
  execute( id: ChangeStatusCategoriaDto ): Promise<CategoriaEntity>
}


export class DeleteCategoria implements DeleteCategoriaUseCase {
  
  constructor(
    private readonly repository: CategoriaRepository,
  ) {}
  
  async execute( cat: ChangeStatusCategoriaDto ): Promise<CategoriaEntity> {

    const category = await this.repository.findById(cat.id);

    if(!category)
      throw CustomError.resourceExists('Este id no esta registrado');

    if(category.estado == 0)
      throw CustomError.resourceExists('Este elemento ya fue eliminado');

    return this.repository.deleteById(cat);
  }

}