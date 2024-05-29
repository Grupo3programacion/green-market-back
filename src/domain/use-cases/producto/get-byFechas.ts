
import { ProductoEntity } from '../../entities/producto.entity';
import { ProductoRepository } from '../../repositories/producto.repository';


export interface GetProductoByFechas{
  execute(fechaIni: Date, fechaFin: Date): Promise<ProductoEntity[]>
}


export class GetProductosByFechasUseCase implements GetProductoByFechas {
  
  constructor(
    private readonly repository: ProductoRepository,
  ) {}
  
   execute(fechaIni: Date, fechaFin: Date): Promise<ProductoEntity[]> {

    return this.repository.getByFechas(fechaIni, fechaFin);
  }

}