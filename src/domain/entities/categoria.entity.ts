



export class CategoriaEntity {

    constructor(
      public id: number,
      public nombre: string,
      public estado: number
    ) {}

  
    public static fromObject( object: {[key: string]: any} ): CategoriaEntity {
      const { id, nombre } = object;
      if ( !id ) throw 'Id is required';
      if ( !nombre ) throw 'nombre is required';
  
      return new CategoriaEntity(id, nombre, 1);
    }
  
  }