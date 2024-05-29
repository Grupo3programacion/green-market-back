

export class changeStatusProductoDto {

    private constructor(
      public readonly id : number,
      public readonly estado: number,
    ){}
  
    get values() {
      const returnObj: {[key: string]: any} = {};
  
      console.log("Miremos: " + this.estado);
      if ( this.estado ) returnObj.estado = this.estado;
      
      console.log("Miremos 2" + returnObj.estado )
      return returnObj;
    }
  
  
    static create( props: {[key:string]: any} ): [string?, changeStatusProductoDto?]  {
  
      let {id, estado } = props;
    //   let newCompletedAt = completedAt;
  
      if ( !id || isNaN( Number(id)) ) {
        return ['id must be a valid number'];
      }

      id = Number(id);

      console.log("Entre por aqui");
   
      return [undefined, new changeStatusProductoDto(id, 2)];
      
    }
  }