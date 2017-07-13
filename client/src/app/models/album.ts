//Lo primero , exportamos la clase

export class Album{
    /**
     * Las propiedades se pueden declarar en el constructor ya que con 
     * typescript y los nuevo estandares, lo que le pases al constructor
     * el solo crea la propiedad y le asigna un valor, es decir, 
     * automatiza el proceso y nos ahorra código
     */

    constructor(
        public title : string,
        public description : string,
        public year : number,
        public image : string,
        public artist : string
    ){}


}