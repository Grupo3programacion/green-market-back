
import { VentaEntity } from '../../entities/venta.entity';
import { VentaRepository } from '../../repositories/venta.repository';


export interface GetAllVentasUseCase {
  execute(): Promise<VentaEntity[]>
}

export class GetVentas implements GetAllVentasUseCase {
  
  constructor(
    private readonly repository: VentaRepository,
  ) {}
  
  execute(): Promise<VentaEntity[]> {

    return this.repository.getAll();
  }

}