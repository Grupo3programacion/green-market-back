import { CreateVentaDto, UpdateVentaDto } from "../../domain";
import { VentaDatasource } from "../../domain/datasources/venta.datasources";
import { VentaEntity } from "../../domain/entities/venta.entity";
import { VentaRepository } from "../../domain/repositories/venta.repository";


enum EstadoVenta {

    PENDIENTE,
    CANCELADA,
    PROCESO,
    HECHA
  }



export class VentaRepositoryIml implements VentaRepository {

    constructor(
        private readonly datasource: VentaDatasource
    ){}

    create(ventaDto: CreateVentaDto): Promise<VentaEntity>{

       return this.datasource.hacerVenta(ventaDto); 
    }
    getAll(): Promise<VentaEntity[]>{

        return this.datasource.getAll();
    }
    findById(id: number): Promise<VentaEntity | null>{

        return this.datasource.findById(id);
    } 

    findByCliente(id: number): Promise<VentaEntity[]>{

        return this.datasource.findByCliente(id);
    }
    updateById(updateVentaDto: UpdateVentaDto): Promise<VentaEntity>{
        
        return this.datasource.updateById(updateVentaDto);
    }
    findByFechas( fechaDesde: Date, fechaHasta : Date ): Promise<VentaEntity[]>{

   return this.datasource.findByFechas(fechaDesde,fechaHasta);
   }

    changeEstado(id:number, estado:  EstadoVenta) : Promise<VentaEntity>{

        return this.datasource.changeEstado(id,estado);
    }

     getGanancias(fechaDesde: Date, fechaHasta : Date): Promise<VentaEntity[]>{

        return this.datasource.getGanancias(fechaDesde,fechaHasta);
    }
}