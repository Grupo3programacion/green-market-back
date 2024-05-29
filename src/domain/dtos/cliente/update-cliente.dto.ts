

export class UpdateClienteDto {

    private constructor(
      public readonly id : number,
      public readonly nombre: string,
      public readonly telefono?: string,
      public readonly correo?: string,
      public readonly clave?: string,
    ){}
  
    get values() {
      const returnObj: {[key: string]: any} = {};
  
      if ( this.nombre ) returnObj.nombre = this.nombre;
      if ( this.telefono ) returnObj.telefono = this.telefono;
      if ( this.correo ) returnObj.correo = this.correo;
      if( this.id) returnObj.id = this.id;
      if(this.clave) returnObj.clave = this.clave
      
      return returnObj;
    }
  
  
    static create( props: {[key:string]: any} ): [string?, UpdateClienteDto?]  {
  
      const {id, nombre, telefono, correo, clave } = props;
    //   let newCompletedAt = completedAt;
  
      if ( !id || isNaN( Number(id)) ) {
        return ['id must be a valid number'];
      }

      console.log(id);
      console.log(nombre);
      console.log(telefono);
      console.log(correo);
      console.log(clave);
   
      return [undefined, new UpdateClienteDto(id, nombre, telefono,correo,clave)];
      
    }
  }