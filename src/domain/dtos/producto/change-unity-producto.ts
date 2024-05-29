

export class ChangeUnityProductoDto {

    private constructor(
      public readonly id : number,
      public readonly cantidad: number,
    ){}
  
    get values() {
      const returnObj: {[key: string]: any} = {};
  
      if ( this.cantidad ) returnObj.cantidad = this.cantidad;
      
      return returnObj;
    }
  
  
    static create( props: {[key:string]: any} ): [string?, ChangeUnityProductoDto?]  {
  
      let {id, cantidad } = props;
    //   let newCompletedAt = completedAt;
  
      if ( !id || isNaN( Number(id)) ) {
        return ['id must be a valid number'];
      }

      id = Number(id);
   
      return [undefined, new ChangeUnityProductoDto(id, cantidad)];
      
    }
  }