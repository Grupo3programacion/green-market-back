
import { VentaEntity } from '../../entities/venta.entity';
import { VentaRepository } from '../../repositories/venta.repository';

export interface GetAllVentasGananciasUseCase {
  execute(desde:Date , hasta:Date): Promise<VentaEntity[]>
}

export class GetVentasGananciasUseCase implements GetAllVentasGananciasUseCase {
  
  constructor(
    private readonly repository: VentaRepository,
  ) {}
  
  execute(desde:Date , hasta:Date): Promise<VentaEntity[]> {

    return this.repository.getGanancias(desde, hasta);
    
  }

}