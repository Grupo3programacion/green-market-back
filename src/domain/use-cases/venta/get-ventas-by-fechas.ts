
import { VentaEntity } from '../../entities/venta.entity';
import { VentaRepository } from '../../repositories/venta.repository';

export interface GetAllVentasUseCase {
  execute(desde:Date , hasta:Date): Promise<VentaEntity[]>
}

export class GetVentasByFechas implements GetAllVentasUseCase {
  
  constructor(
    private readonly repository: VentaRepository,
  ) {}
  
  execute(desde:Date , hasta:Date): Promise<VentaEntity[]> {

    return this.repository.findByFechas(desde, hasta);
  }

}