//Lo primero , exportamos la clase

export class User{
    /**
     * Las propiedades se pueden declarar en el constructor ya que con 
     * typescript y los nuevo estandares, lo que le pases al constructor
     * el solo crea la propiedad y le asigna un valor, es decir, 
     * automatiza el proceso y nos ahorra código
     */

    constructor(
        public _id: string,
        public name : string,
        public surname : string,
        public email : string,
        public password: string,
        public role : string,
        public image : string
    ){}


}