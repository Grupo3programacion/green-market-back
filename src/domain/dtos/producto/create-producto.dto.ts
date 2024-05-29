






export class CreateProductoDto {

    private constructor(
      public readonly nombreProducto: string,
      public readonly cantidad: number,
      public readonly precioVenta: number,
      public readonly nombreProveedor: string,
      public readonly precioAdquirido: number,
      public readonly fechaAdquirido: Date,
      public readonly idCategoria: number,
      public readonly imagen: string,
      public readonly estado: number,
    ){}
    
    static create( props: {[key:string]: any} ): [string?, CreateProductoDto?]  {
  
      let { nombreProducto, cantidad, precioVenta, nombreProveedor, precioAdquirido, fechaAdquirido,idCategoria, imagen} = props;
  
      if ( !cantidad ) return ['cantidad property is required', undefined];
      if ( !nombreProducto ) return ['nombre property is required', undefined];
      if ( !precioVenta ) return ['precioVenta property is required', undefined];
      if ( !nombreProveedor ) return ['nombreProveedor property is required', undefined];
      if ( !precioAdquirido ) return ['precioAdquirido property is required', undefined];
      if ( !fechaAdquirido ) return ['fecha Adquirido property is required', undefined];
      if ( !idCategoria ) return ['idCategoria property is required', undefined];
      if ( !imagen ) return ['imagen property is required', undefined];

      let fechaAdquiridoSave = fechaAdquirido;
  
      if ( fechaAdquirido ) {
        fechaAdquiridoSave = new Date( fechaAdquirido)
        if ( fechaAdquiridoSave.toString() === 'Invalid Date' ) {
          return ['fecha adquirido must be a valid date']
        }
      }


      if(Number.isNaN(precioVenta))
        return ['precio venta debe ser un numero'];

       precioVenta = Number(precioVenta);

      if(Number.isNaN(precioAdquirido))
        return ['precio adquirido debe ser un numero'];

      precioAdquirido = Number(precioAdquirido);

      if(Number.isNaN(cantidad))
        return ['la cantidad debe ser un numero'];
      
      cantidad = Number(cantidad);

      idCategoria = Number(idCategoria);

      return [undefined, new CreateProductoDto(nombreProducto,cantidad,precioVenta,nombreProveedor,precioAdquirido,fechaAdquiridoSave,idCategoria,imagen, 1)];
    }
  
  }