import { CreateProductoDto, UpdateProductoDto } from "../../domain";
import { ProductoDatasource } from "../../domain/datasources/producto.datasources";
import { changeStatusProductoDto } from "../../domain/dtos/producto/change-state-producto.dto";
import { ChangeUnityProductoDto } from "../../domain/dtos/producto/change-unity-producto";
import { ProductoEntity } from "../../domain/entities/producto.entity";
import { ProductoRepository } from "../../domain/repositories/producto.repository";




export class ProductoRepositoryIml implements ProductoRepository {

    constructor(
        private readonly datasource: ProductoDatasource
    ){}

    create(productoDto: CreateProductoDto): Promise<ProductoEntity>{

       return this.datasource.create(productoDto); 
    }
    getAll(): Promise<ProductoEntity[]>{

        return this.datasource.getAll();
    }
    findById(id: number): Promise<ProductoEntity>{

        return this.datasource.findById(id);
    }

    findByName(nombre: string): Promise<ProductoEntity | undefined>{

        return this.datasource.findByName(nombre);
    }
    updateById(updateProductoDto: UpdateProductoDto): Promise<ProductoEntity>{
        
        return this.datasource.updateById(updateProductoDto);
    }
   activateProducto ( changeStatusProductoDto : changeStatusProductoDto ): Promise<ProductoEntity>{

   return this.datasource.activateProducto(changeStatusProductoDto);
   }

    deleteById(changeStatusProductoDto: changeStatusProductoDto): Promise<ProductoEntity | null>{

        return this.datasource.deleteById(changeStatusProductoDto);
    }

    addUnity(changeUnityProductoDto : ChangeUnityProductoDto ): Promise<ProductoEntity>{

        return this.datasource.addUnity(changeUnityProductoDto);
    }

    getByFechas(fechaIni: Date, fechaFin: Date): Promise<ProductoEntity[]>{

        return this.datasource.getByFechas(fechaIni, fechaFin);
    }

}