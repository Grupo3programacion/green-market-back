import { CategoriaEntity } from '../../entities/categoria.entity';
import { CategoriaRepository } from '../../repositories/categoria.repository';

export interface GetCategoriaUseCase {
  execute( id: number ): Promise<CategoriaEntity>
}


export class GetCategoria implements GetCategoriaUseCase {
  
  constructor(
    private readonly repository: CategoriaRepository,
  ) {}
  
  execute( id: number ): Promise<CategoriaEntity> {
    
    return this.repository.findById(id);
  }

}