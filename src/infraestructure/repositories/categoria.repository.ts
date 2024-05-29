import { CreateCategoriaDto, UpdateCategoriaDto } from "../../domain";
import { CategoriaDatasource } from "../../domain/datasources/categoria.datasources";
import { ChangeStatusCategoriaDto } from "../../domain/dtos/categoria/change-status-categoria.dto";
import { CategoriaEntity } from "../../domain/entities/categoria.entity";
import { CategoriaRepository } from "../../domain/repositories/categoria.repository";




export class CategoriaRepositoryIml implements CategoriaRepository {

    constructor(
        private readonly datasource: CategoriaDatasource
    ){}

    create(createCategoriaDto: CreateCategoriaDto): Promise<CategoriaEntity>{

       return this.datasource.create(createCategoriaDto); 
    }
    getAll(): Promise<CategoriaEntity[]>{

        return this.datasource.getAll();
    }
    findById(id: number): Promise<CategoriaEntity>{

        return this.datasource.findById(id);
    }
    updateById(updateCategoriaDto: UpdateCategoriaDto): Promise<CategoriaEntity>{
        
        return this.datasource.updateById(updateCategoriaDto);
    }
    deleteById(changeStatusCategoriaDto: ChangeStatusCategoriaDto): Promise<CategoriaEntity>{

        return this.datasource.deleteById(changeStatusCategoriaDto);
    }

    findByName(nombre: string): Promise<CategoriaEntity | undefined>{
        
        return this.datasource.findByName(nombre);
    }
   
}