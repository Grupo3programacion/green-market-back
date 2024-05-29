import { create } from "domain";
import { prisma } from "../../data/postgres";
import { CreateVentaDto, UpdateVentaDto } from "../../domain";
import { VentaDatasource } from "../../domain/datasources/venta.datasources";
import { VentaEntity } from "../../domain/entities/venta.entity";
import { DetalleVenta } from '@prisma/client';
import { DetalleVentaEntity } from "../../domain/entities/detalleVenta.entity";
import { MasVendidosDto } from "../../domain/dtos/venta/mas-vendidos.dto";


enum EstadoVenta {

    PENDIENTE,
    CANCELADA,
    PROCESO,
    HECHA
}

export class VentaDataSourceImp implements VentaDatasource {


    async hacerVenta(create: CreateVentaDto): Promise<VentaEntity> {

        const { precioTotal, fechaVenta, idCliente, estadoVenta } = create;
        const { detalleVenta } = create;

        const venta = await prisma.venta.create({
            data: {
                precioTotal,
                fechaVenta,
                idCliente,
                estado: estadoVenta.toString(),
                detalleVenta: {
                    create: detalleVenta
                }
            },
            include: {
                detalleVenta: true
            }

        });


        return VentaEntity.fromObject(venta);
    }

    async getAll(): Promise<VentaEntity[]> {


        const ventas = await prisma.venta.findMany({
            include: {
                detalleVenta: true,
            },
        });


        const ventasConvertidas = ventas.map(venta => {
            return new VentaEntity(
                venta.id,
                venta.precioTotal,
                venta.idCliente,
                <EstadoVenta><unknown>venta.estado,
                venta.detalleVenta.map(detalle => new DetalleVentaEntity(detalle.idProducto, detalle.idVenta, detalle.cantidad)),
                venta.fechaVenta,
            );
        });

        return ventasConvertidas;

    }

    async findById(id: number): Promise<VentaEntity | null> {

        const venta = await prisma.venta.findFirst({
            where: {
                id: id
            },
            include: {
                detalleVenta: true,
            },
        });

        if (!venta)
            return null;

        const ventaEnity = new VentaEntity(
            venta.id,
            venta.precioTotal,
            venta.idCliente,
            <EstadoVenta><unknown>venta?.estado,
            venta.detalleVenta.map(detalle => new DetalleVentaEntity(detalle.idProducto, detalle.idVenta, detalle.cantidad)),
            venta.fechaVenta
        )

        return ventaEnity;
    }

    async findByCliente(id: number): Promise<VentaEntity[]> {

        const ventas = await prisma.venta.findMany({
            where: {
                idCliente: id
            },
            include: {
                detalleVenta: true,
            },
        });


        const ventasConvertidas = ventas.map(venta => {
            return new VentaEntity(
                venta.id,
                venta.precioTotal,
                venta.idCliente,
                <EstadoVenta><unknown>venta.estado,
                venta.detalleVenta.map(detalle => new DetalleVentaEntity(detalle.idProducto, detalle.idVenta, detalle.cantidad)),
                venta.fechaVenta,
            );
        });

        return ventasConvertidas;
    }

    async findByFechas(fechaDesde: Date, fechaHasta: Date): Promise<any[] > {
        
        const ventas = await prisma.venta.findMany({
            where: {
                fechaVenta: {
                    gte: (fechaDesde),
                    lte: (fechaHasta)
                }
            },
            include: {
                detalleVenta: {
                    include: {
                        Producto: {
                            include: {
                                Categoria:true
                            }
                        }
                    }
                }
                    // include: {
                //         Producto : {
                //             select : {
                //                 // id: true,
                //                 // nombreProducto: true,
                //                 // idCategoria: true,
                //                 // Categoria: {
                //                 //     select: {
                //                 //       nombre : true
                //                 //     }
                //                 //   }
                //             }
                //         }
                //     },
                //     select: {
                //         cantidad: true
                //     }
                // },
            },
        });

       const ventasTransformadas =  ventas.flatMap(venta => 
            venta.detalleVenta.map (detalle => ({

                id: detalle.Producto.id,
                nombreProducto: detalle.Producto.nombreProducto,
                categoria: detalle.Producto.Categoria.nombre,
                fechaVenta: venta.fechaVenta,
                cantidad: detalle.cantidad,
                
            }))
        ).sort((a, b) => b.cantidad - a.cantidad);

        return ventasTransformadas.reduce <any[]>((acc, curr) => {
            const found = acc.find(item => item.id === curr.id);
            if (found) {
                found.cantidad += curr.cantidad;
            } else {
                acc.push({ ...curr });
            }
            return acc;
        }, []).sort((a, b) => b.cantidad - a.cantidad);

        // return ventasConvertidas;

    }

    async changeEstado(id: number, estado: EstadoVenta): Promise<VentaEntity> {

        await this.findById(id);

        const updatedVenta = await prisma.venta.update({
            where: { id: id },
            data: { estado: estado.toString() }
        });

        return VentaEntity.fromObject(updatedVenta);
    }

    async updateById(updateVentaDto: UpdateVentaDto): Promise<VentaEntity> {

        await this.findById(updateVentaDto.id);
        const {precioTotal, estadoVenta} = updateVentaDto.values;
        const {detalleVenta} = updateVentaDto.values;

        const updatedVenta = await prisma.venta.update({
            where: { id: updateVentaDto.id },
            data: {
                precioTotal: precioTotal,
                estado: estadoVenta.toString(),
                detalleVenta: {
                    update: detalleVenta

                }
            },
            include: {
                detalleVenta:true
            }
        });

        return VentaEntity.fromObject(updatedVenta);

    }

    async getGanancias(fechaDesde: Date, fechaHasta : Date): Promise<any[]>{

        const ventas = await prisma.venta.findMany({

            orderBy: {
                fechaVenta: 'desc' // Ordenar por createdAt de forma descendente
              },
            where: {
                fechaVenta: {
                    gte: (fechaDesde),
                    lte: (fechaHasta)
                }
            },
            include: {
                detalleVenta: {
                    include: {
                        Producto: {
                            include: {
                                Categoria:true
                            }
                        }
                    }
                }
            },
        });

        return  ventas.flatMap(venta => 
            venta.detalleVenta.map (detalle => ({
                id: detalle.Producto.id,
                nombreProducto: detalle.Producto.nombreProducto,
                categoria: detalle.Producto.Categoria.nombre,
                cantidad: detalle.cantidad,
                fechaVenta: venta.fechaVenta,
                valorUnitarioAdquirido: detalle.Producto.precioAdquirido,
                valorUnitarioVenta: detalle.Producto.precioVenta,
                valorTotalAdquirido: detalle.Producto.precioAdquirido * detalle.cantidad,
                valorTotalVenta: venta.precioTotal,
                ganancia: (venta.precioTotal) - (detalle.Producto.precioAdquirido * detalle.cantidad)
                
            }))
        );

    }

}