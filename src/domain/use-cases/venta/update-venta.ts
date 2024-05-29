import { UpdateVentaDto } from "../../dtos";
import { VentaEntity } from "../../entities/venta.entity";
import { CustomError } from "../../errors/custom.error";
import { VentaRepository } from "../../repositories/venta.repository";




export interface UpdateVentaUseCase {
    execute( dto: UpdateVentaDto ): Promise<VentaEntity>
  }
  
  
  export class UpdateVenta implements UpdateVentaUseCase {
    
    constructor(
      private readonly repository: VentaRepository,
    ) {}
    
    async execute( dto: UpdateVentaDto ): Promise<VentaEntity> {
      
      const venta = await this.repository.findById(dto.id);
  
      if(!venta)
        throw CustomError.resourceExists('Esta venta no esta registrada');
      
      return this.repository.updateById(dto);
  
    }
  
  }