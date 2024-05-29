export class CreateClienteDto {

    private constructor(
      public readonly id: number,
      public readonly nombre: string,
      public readonly telefono: string,
      public readonly correo: string,
      public readonly clave: string,
      public readonly estado: number,
      
    ){}
    
    static create( props: {[key:string]: any} ): [string?, CreateClienteDto?]  {
  
      let { id,nombre, telefono, correo, clave } = props;
  
      if ( !id ) return ['cedula property is required', undefined];
      if ( !nombre ) return ['nombre property is required', undefined];
      if ( !telefono ) return ['telefono property is required', undefined];
      if ( !correo ) return ['correo property is required', undefined];
      if ( !clave) return ['clave property is required', undefined]

      if(Number.isNaN(id))
        return ['id cliente debe ser un numero'];

       id = Number(id);

      return [undefined, new CreateClienteDto(id,nombre,telefono,correo,clave, 1)];
    }
  
  }