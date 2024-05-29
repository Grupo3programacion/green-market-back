

export class UpdateProductoDto {

    private constructor(
      public readonly id: number,
      public readonly nombreProducto: string,
      public readonly imagen: string,
      public readonly cantidad?: number,
      public readonly precioVenta?: number,
      public readonly nombreProveedor ?: string,
      public readonly precioAdquirido ?: number,
      
    ){}
  
    get values() {
      const returnObj: {[key: string]: any} = {};
  
      if (this.id) returnObj.id = this.id;
      if ( this.nombreProducto ) returnObj.nombreProducto = this.nombreProducto;
      if ( this.cantidad ) returnObj.cantidad = this.cantidad;
      if ( this.imagen ) returnObj.imagen = this.imagen;
      if ( this.precioVenta ) returnObj.precioVenta = this.precioVenta;
      if ( this.nombreProveedor ) returnObj.nombreProveedor = this.nombreProveedor;
      if ( this.precioAdquirido ) returnObj.precioAdquirido = this.precioAdquirido;
      
      return returnObj;
    }
  
  
    static create( props: {[key:string]: any} ): [string?, UpdateProductoDto?]  {
  
      let {id, nombreProducto,cantidad, precioVenta, nombreProveedor,precioAdquirido,imagen } = props;
    //   let newCompletedAt = completedAt;
  
      if ( !id || isNaN( Number(id)) ) {
        return ['id must be a valid number'];
      }

      if(Number.isNaN(precioVenta))
        return ['precio venta debe ser un numero'];

      if(Number.isNaN(precioAdquirido))
        return ['precio adquirido debe ser un numero'];

      if(Number.isNaN(cantidad))
        return ['la cantidad debe ser un numero'];

      id = Number(id);
      cantidad = Number(cantidad);
      precioVenta = Number(precioVenta);
      precioAdquirido = Number(precioAdquirido);
    
      return [undefined, new UpdateProductoDto(id,nombreProducto,imagen, cantidad, precioVenta,nombreProveedor, precioAdquirido)];
    }
  }