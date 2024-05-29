
import { VentaEntity } from '../../entities/venta.entity';
import { VentaRepository } from '../../repositories/venta.repository';

export interface GetAllVentasByClientesUseCase {
  execute(id:number): Promise<VentaEntity[]>
}

export class GetVentasByClientes implements GetAllVentasByClientesUseCase {
  
  constructor(
    private readonly repository: VentaRepository,
  ) {}
  
  execute(id: number): Promise<VentaEntity[]> {

    return this.repository.findByCliente(id);
  }

}