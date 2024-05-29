

export class UpdateCategoriaDto {

    private constructor(
      public readonly id: number,
      public readonly nombre?: string,
    ){}
    get values() {
      const returnObj: {[key: string]: any} = {};
  
      if ( this.nombre ) returnObj.nombre = this.nombre;
      if ( this.id ) returnObj.id = this.id;
      
      return returnObj;
    }

    static create( props: {[key:string]: any} ): [string?, UpdateCategoriaDto?]  {
  
      const {id, nombre } = props;
    //   let newCompletedAt = completedAt;
  
      if ( !id || isNaN( Number(id)) ) {
        return ['id must be a valid number'];
      }
      
      return [undefined, new UpdateCategoriaDto(id,nombre)];
    }
  }