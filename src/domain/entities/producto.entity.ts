import { escape } from "querystring";




export class ProductoEntity {

    constructor(
      public id: number,
      public nombreProducto: string,
      public cantidad: number,
      public precioVenta: number,
      public precioAdquirido: number,
      public nombreProveedor: string,
      public imagen: string,
      public idCategoria: number,
      public nombreCategoria: string,
      public estado: number,
      public fechaAdquirido?: Date|null,
    ) {}
  
    // get isCompleted() {
    //   return !!this.completedAt;
    // }
  
    public static fromObject( object: {[key: string]: any} ): ProductoEntity {
      const { id, nombreProducto, cantidad, precioVenta, precioAdquirido,nombreProveedor,imagen, idCategoria, fechaAdquirido, estado,Categoria} = object;
      if ( !id ) throw 'Id is required';
      if ( !nombreProducto ) throw 'nombreProducto is required';
      if ( !cantidad ) throw 'cantidad is required';
      if ( !precioVenta ) throw 'precioVenta is required';
      if ( !precioAdquirido) throw 'precioAdquirido is required';
      if ( !idCategoria) throw 'idCategoria is required';
      if ( !fechaAdquirido) throw 'fechaAdquirido is required';
      if ( !nombreProveedor) throw 'nombreProveedor is required';
      if ( !imagen) throw 'imagen is required';
      if ( !estado) throw 'estado is required'
      
  
    //   let newCompletedAt;
    //   if ( completedAt ) {
    //     newCompletedAt = new Date(completedAt);
    //     if ( isNaN( newCompletedAt.getTime() ) ) {
    //       throw 'CompletedAt is not a valid date'
    //     }
    //   }
    
      return new ProductoEntity(id, nombreProducto, cantidad,precioVenta, precioAdquirido,nombreProveedor,imagen, idCategoria,Categoria.nombre, estado, fechaAdquirido );
    }
  
  }