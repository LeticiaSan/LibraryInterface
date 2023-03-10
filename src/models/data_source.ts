import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "./BookDTO";
import { Category } from "./CategoryDTO";
import { User } from "./UserDTO";


export const MariaDBDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "library",
    synchronize: true,
    logging: false,
    entities: [Book, Category, User],
    migrations: [],
    subscribers: [],
})

export function dataSourceStart(){
    MariaDBDataSource.initialize().then( ()=>{
        console.log("Inicializada a fonte de dados...");
    }).catch((err)=>{
        console.error("Erro de inicialização da fonte de dados");
    }) 
}