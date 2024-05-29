import { VentaEntity } from "../../entities/venta.entity";
import { CustomError } from "../../errors/custom.error";
import { VentaRepository } from "../../repositories/venta.repository";


enum EstadoVenta {

    PENDIENTE,
    CANCELADA,
    PROCESO,
    HECHA
}

export interface  changeStatusVentaCase {

    execute(idVenta:number, estado: EstadoVenta): Promise<VentaEntity>
}

export class changeStateVenta implements changeStatusVentaCase{


    constructor (
        private readonly ventaRepository: VentaRepository
    ){}

    async  execute(idVenta:number, estado: EstadoVenta): Promise<VentaEntity> {
        
        const venta  = await this.ventaRepository.findById(idVenta);
        if(!venta)
            throw CustomError.resourceExists('el id de la venta es erroneo');

        return this.ventaRepository.changeEstado(idVenta, estado);
    }
}