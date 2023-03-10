import { MariaDBDataSource, dataSourceStart } from "./data_source";
import { Book } from "./BookDTO";
import { Category } from "./CategoryDTO";
import { User } from "./UserDTO";

export class Service{    
    start(){
        dataSourceStart();
    }
    insert(projeto: Book | Category | User ){
        MariaDBDataSource.manager.save(projeto);
        return projeto;
    }
    async listAll(){
       let list = await MariaDBDataSource.manager.find(Book);
       return list;
    }
}

