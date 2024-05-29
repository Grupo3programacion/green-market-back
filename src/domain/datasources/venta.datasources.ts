import { CreateVentaDto } from '../dtos/venta/create-venta.dto';
import { UpdateVentaDto } from '../dtos/venta/update-venta.dto';
import { VentaEntity } from '../entities/venta.entity';


enum EstadoVenta {

  PENDIENTE,
  CANCELADA,
  PROCESO,
  HECHA
}
export abstract class VentaDatasource {



  abstract hacerVenta( create: CreateVentaDto ): Promise<VentaEntity>;

  //todo: paginación
  abstract getAll(): Promise<VentaEntity[]>;
  abstract findById(id: number): Promise<VentaEntity | null >;
  abstract findByCliente( id: number ): Promise<VentaEntity[]>;
  abstract findByFechas( fechaDesde: Date, fechaHasta : Date ): Promise<VentaEntity[]>;

  abstract changeEstado(id:number, estado:  EstadoVenta) : Promise<VentaEntity>;
  abstract updateById( updateVentaDto: UpdateVentaDto ): Promise<VentaEntity>;

  abstract getGanancias(fechaDesde: Date, fechaHasta : Date): Promise<VentaEntity[]>;

}