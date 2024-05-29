import { CreateVentaDto } from "../../dtos";
import { ChangeUnityProductoDto } from "../../dtos/producto/change-unity-producto";
import { VentaEntity } from "../../entities/venta.entity";
import { CustomError } from "../../errors/custom.error";
import { ClienteRepository } from "../../repositories/cliente.repository";
import { ProductoRepository } from "../../repositories/producto.repository";
import { VentaRepository } from "../../repositories/venta.repository";
import { EmailService } from '../../../presentation/email/email.service';



export interface makeVentaUseCase {
    execute( dto: CreateVentaDto ): Promise<VentaEntity>
}

export class MakeVenta implements makeVentaUseCase {

  constructor(
    private readonly repository: VentaRepository,
    private readonly clienteRepository: ClienteRepository,
    private readonly productoRepository: ProductoRepository,
    private readonly emailService: EmailService
  ) {}

  async execute( dto: CreateVentaDto ): Promise<VentaEntity> {

    const cliente = await this.clienteRepository.findById(dto.idCliente);

    dto.detalleVenta?.forEach( async (detalle) => {
      const producto = await this.productoRepository.findById(detalle.idProducto);
      if(!producto)
        throw CustomError.resourceExists(`el producto con id ${detalle.idProducto} no esta registrado, todos los productos deben estar registrados para hacer la compra`);
      if(producto.estado == 0)
        throw CustomError.resourceExists(`el producto con id ${detalle.idProducto} no esta activo, todos los productos deben estar activos para hacer la compra`);
      if(producto.cantidad <= 0)
        throw CustomError.badRequest(`el producto con id ${detalle.idProducto} no tiene una cantidad valida`);

      if(detalle.cantidad > producto.cantidad)
        throw CustomError.resourceExists(`el producto con nombre ${producto.nombreProducto} no tiene la cantidad suficiente`);

      let cantidad = producto.cantidad - detalle.cantidad;
      const [error, changeUnity] =  ChangeUnityProductoDto.create({id: detalle.idProducto, cantidad: cantidad});
      if(error){
        throw CustomError.internalServer(error);
      }
      this.productoRepository.addUnity( changeUnity! );
      
    });

    if(!cliente)
      throw CustomError.resourceExists('el cliente no esta registrado');
    if( cliente.estado == 0)
      throw CustomError.resourceExists('el cliente esta inactivo');


    console.log("Holaaaa");
    return this.repository.create(dto);
  }

  async enviarCorreo(venta: any): Promise<any>{


    // 
    const cliente = await this.clienteRepository.findById(venta.idCliente);

    let htmlBody = `<h1>Se hizo una compra en greenMarket con la siguiente informacion</h1>
    <br>
    <b>IdentificacionCliente: ${cliente.id}</b>
    <br>
    <b>Telefono: ${cliente.telefono}</b>
    <br>
    <b>TotalVenta: ${venta.precioTotal}</b>
    <br>
    <b>Fecha: ${venta.fechaVenta}</b>
    <br>
    <b>Detalle:</b>
    <br>
    `;
    const detallePromises = venta.detalleVenta?.map(async (detalle: any) => {
      const producto = await this.productoRepository.findById(detalle.idProducto);
      htmlBody += `
        Nombre producto: ${producto.nombreProducto}
        <br>
        Valor producto: ${producto.precioVenta}
        <br>
        cantidad comprada: ${detalle.cantidad}
        <br>
      `;
    }) || [];
  
    // Espera a que todas las promesas se resuelvan

    await Promise.all(detallePromises);

    try{

    this.emailService.sendEmail({
      to: cliente.correo,
      subject: "Compra en greenMarket",
      htmlBody: htmlBody
    });
  } catch(error){
    console.log(error);
    throw CustomError.internalServer( "error al enviar el correo");
  }

    return venta;

  }
}