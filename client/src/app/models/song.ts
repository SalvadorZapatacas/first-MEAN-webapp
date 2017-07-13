//Lo primero , exportamos la clase

export class Song{
    /**
     * Las propiedades se pueden declarar en el constructor ya que con 
     * typescript y los nuevo estandares, lo que le pases al constructor
     * el solo crea la propiedad y le asigna un valor, es decir, 
     * automatiza el proceso y nos ahorra código
     */

    constructor(
        public number: number,
        public name : string,
        public duration : string,
        public file : string,
        public album : string
    ){}


}