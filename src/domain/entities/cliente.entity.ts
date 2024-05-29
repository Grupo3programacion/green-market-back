



export class ClienteEntity {

    constructor(
      public id: number,
      public nombre: string,
      public telefono: string,
      public correo: string,
      public clave: string,
      public estado: number
    ) {}
  
  
    public static fromObject( object: {[key: string]: any} ): ClienteEntity {
      const { id, nombre, telefono, correo, clave } = object;
      console.log("Entidad");
      console.log(object)
      if ( !id ) throw 'Id is required';
      if ( !nombre ) throw 'nombre is required';
      if ( !telefono ) throw 'telefono is required';
      if ( !correo ) throw 'correo is required';
      if( !clave) throw 'clave is required';
  
      return new ClienteEntity(id, nombre, telefono,correo,clave, 1);
    }
  
  }