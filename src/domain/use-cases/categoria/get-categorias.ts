import { CategoriaEntity } from '../../entities/categoria.entity';
import { CategoriaRepository } from '../../repositories/categoria.repository';


export interface GetCategoriasUseCase {
  execute(): Promise<CategoriaEntity[]>
}


export class GetCategorias implements GetCategoriasUseCase {
  
  constructor(
    private readonly repository: CategoriaRepository,
  ) {}
  
  execute(): Promise<CategoriaEntity[]> {
    
    return this.repository.getAll();
  }

}