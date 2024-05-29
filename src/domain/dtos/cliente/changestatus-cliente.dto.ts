

export class changeStatusClienteDto {

    private constructor(
      public readonly id : number,
      public readonly estado: number,
    ){}
  
    get values() {
      const returnObj: {[key: string]: any} = {};
  
      if ( this.estado ) returnObj.estado = this.estado;
      
      return returnObj;
    }
  
  
    static create( props: {[key:string]: any} ): [string?, changeStatusClienteDto?]  {
  
      const {id, estado } = props;
    //   let newCompletedAt = completedAt;
  
      if ( !id || isNaN( Number(id)) ) {
        return ['id must be a valid number'];
      }
   
      return [undefined, new changeStatusClienteDto(id, estado)];
      
    }
  }