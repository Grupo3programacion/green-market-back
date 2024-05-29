import { CreateCategoriaDto } from '../../dtos';
import { CategoriaEntity } from '../../entities/categoria.entity';
import { CategoriaRepository } from '../../repositories/categoria.repository';
import { CustomError } from '../../errors/custom.error';


export interface CreateCategoriaUseCase {
   execute( dto: CreateCategoriaDto ): Promise<CategoriaEntity>
}

export class CreateCategoria implements CreateCategoriaUseCase {
  
  constructor(
    private readonly repository: CategoriaRepository,
  ) {}
  
 async execute( dto: CreateCategoriaDto ): Promise<CategoriaEntity> {

  console.log("Hemeee");
  console.log(dto);

  // const categoryName = await this.repository.findByName(dto.nombre);

  console.log(dto);
  

    // if(categoryName != null && categoryName.estado == 1)
    //   throw CustomError.resourceExists('Una categoria con este nombre ya existe');


    return this.repository.create(dto);
  }

}