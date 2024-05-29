export class CreateCategoriaDto {

    private constructor(
      public readonly nombre: string,
      public readonly estado: number
    ){}
    
    static create( props: {[key:string]: any} ): [string?, CreateCategoriaDto?]  {
  
    

      const { nombre } = props;

      console.log(nombre);

      if ( !nombre ) return ['nombre property is required', undefined];
      
      return [undefined, new CreateCategoriaDto(nombre, 1)];
    }
  
  }