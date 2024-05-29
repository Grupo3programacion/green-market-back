import { prisma } from "../../data/postgres";
import { CreateCategoriaDto, UpdateCategoriaDto } from "../../domain";
import { CategoriaDatasource } from "../../domain/datasources/categoria.datasources";
import { ChangeStatusCategoriaDto } from "../../domain/dtos/categoria/change-status-categoria.dto";
import { CategoriaEntity } from "../../domain/entities/categoria.entity";


export class CategoriaDatasourceImpl implements CategoriaDatasource {


    async create(createCategoriaDto: CreateCategoriaDto): Promise<CategoriaEntity> {

        console.log(createCategoriaDto);

        const categoria = await prisma.categoria.create({
            data: createCategoriaDto!
        });
        return CategoriaEntity.fromObject(categoria);
    }

    async getAll(): Promise<CategoriaEntity[]> {
        const categoria = await prisma.categoria.findMany();
        return categoria.map(todo => CategoriaEntity.fromObject(todo));
    }

    async findById(id: number): Promise<CategoriaEntity> {
        const categoria = await prisma.categoria.findFirst({
            where: { id }
        });

        if (!categoria) throw `Producto with id ${id} not found`;

        return CategoriaEntity.fromObject(categoria);
    }

    async findByName(nombre: string): Promise<CategoriaEntity | undefined> {

        console.log(":DD");
        console.log(nombre);
        const categoria = await prisma.categoria.findFirst({
            where: { nombre: nombre }
        });

        console.log("Mama mia");
        return categoria ? CategoriaEntity.fromObject(categoria) : undefined;
    }

    async updateById(updateCategoriaDto: UpdateCategoriaDto): Promise<CategoriaEntity> {

        await this.findById(updateCategoriaDto.id);

        const updatedCategoria= await prisma.producto.update({
            where: { id: updateCategoriaDto.id },
            data: updateCategoriaDto!.values
        });

        return CategoriaEntity.fromObject(updatedCategoria);
    }

    async deleteById( changeStatusCategoriaDto: ChangeStatusCategoriaDto ): Promise<CategoriaEntity> {

        await this.findById(changeStatusCategoriaDto.id);

        const deleted = await prisma.cliente.update({
            where: { id: changeStatusCategoriaDto.id },
            data: changeStatusCategoriaDto!.values
        });

        return CategoriaEntity.fromObject(deleted);
    }

  

}