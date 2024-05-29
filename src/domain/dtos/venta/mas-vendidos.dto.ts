

export class MasVendidosDto {


    constructor(

        private readonly id: number,
        private readonly nombreProducto: string,
        private readonly categoria: string,
        private readonly fechaVenta: Date,
        private readonly cantidad: number
    ) {

    }
}