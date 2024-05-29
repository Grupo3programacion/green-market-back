import { prisma } from '../../data/postgres';
import { CreateProductoDto, UpdateProductoDto } from '../../domain';
import { ProductoDatasource } from '../../domain/datasources/producto.datasources';
import { changeStatusProductoDto } from '../../domain/dtos/producto/change-state-producto.dto';
import { ChangeUnityProductoDto } from '../../domain/dtos/producto/change-unity-producto';
import { ProductoEntity } from '../../domain/entities/producto.entity';





export class ProductoDatasourceImpl implements ProductoDatasource {

    async create(createProductoDto: CreateProductoDto): Promise<ProductoEntity> {
        const producto = await prisma.producto.create({
            data: createProductoDto!,

            include: {
                Categoria: true
            }
        });
        return ProductoEntity.fromObject(producto);
    }

    async getAll(): Promise<ProductoEntity[]> {
        const productos = await prisma.producto.findMany({
            where: {
                estado: 1
            },
            include: {
                Categoria:true
            }
        });
        return productos.map(todo => ProductoEntity.fromObject(todo));
    }

    async findById(id: number): Promise<ProductoEntity> {
        const producto = await prisma.producto.findFirst({
            where: { id },
            include: {
                Categoria:true
            }
        });

        if (!producto) throw `Producto with id ${id} not found`;

        return ProductoEntity.fromObject(producto);
    }

    async findByName(nombre: string): Promise<ProductoEntity | undefined> {

        const producto = await prisma.producto.findFirst({
            where: { nombreProducto: nombre },
            include: {
                Categoria:true
            }
        });
        return producto ? ProductoEntity.fromObject(producto) : undefined;
    }

    async updateById(updateProductoDto: UpdateProductoDto): Promise<ProductoEntity> {

        await this.findById(updateProductoDto.id);

    

        const updatedProducto = await prisma.producto.update({
            where: { id: updateProductoDto.id },
            data: updateProductoDto!.values,
            include: {
                Categoria:true
            }
        });

        return ProductoEntity.fromObject(updatedProducto);
    }

    async deleteById(changStatusProductoDto: changeStatusProductoDto): Promise<ProductoEntity | null> {

        const prod  =  await this.findById(changStatusProductoDto.id);

        
        let deleted;
        
        try {
         deleted = await prisma.producto.update({
            where: { id: changStatusProductoDto.id },
            data: {estado : 2 , idCategoria: 1 },
            include: {
                Categoria:true
            }
        });
        return ProductoEntity.fromObject(deleted);
    } catch (error) {
        console.error("Error al obtener categorias:", error);
      }
      return null
        
    }

    async activateProducto(changeStatusProductoDto: changeStatusProductoDto): Promise<ProductoEntity> {

        await this.findById(changeStatusProductoDto.id);

        const update = await prisma.producto.update({
            where: { id: changeStatusProductoDto.id },
            data: changeStatusProductoDto!.values,
            include: {
                Categoria:true
            }
            
        });

        return ProductoEntity.fromObject(update);
    }

    async addUnity(changeUnityProductoDto: ChangeUnityProductoDto): Promise<ProductoEntity> {

        await this.findById(changeUnityProductoDto.id);

        const update = await prisma.producto.update({
            where: { id: changeUnityProductoDto.id },
            data: changeUnityProductoDto!.values,
            include: {
                Categoria:true
            }
        });
        return ProductoEntity.fromObject(update);
    }

    async getByFechas(fechaIni: Date, fechaFin: Date): Promise<ProductoEntity[]> {

        const productos = await prisma.producto.findMany({
            where: {
              fechaAdquirido: {
                gte: new Date(fechaIni),  // mayor o igual a startDate
                lte: new Date(fechaFin)     // menor o igual a endDate
              },
              estado: 1
            },
            include:{
                Categoria: true
            }
          });

           return productos.map(todo => ProductoEntity.fromObject(todo));
    }

}