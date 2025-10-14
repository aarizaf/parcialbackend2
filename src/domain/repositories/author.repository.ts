import { AuthorEntity } from '../entities/author.entity';


export interface IAuthorRepository {
 
  create(author: AuthorEntity): Promise<AuthorEntity>;

  /**
   * Busca un autor por su ID
   * @returns AuthorEntity si existe, null si no existe
   */
  findById(id: string): Promise<AuthorEntity | null>;

  /**
   * Busca un autor por su nombre exacto
   * @returns AuthorEntity si existe, null si no existe
   */
  findByName(name: string): Promise<AuthorEntity | null>;

  
  findAll(): Promise<AuthorEntity[]>;

 
  update(id: string, author: Partial<AuthorEntity>): Promise<AuthorEntity>;

  
  delete(id: string): Promise<boolean>;

  
  existsByName(name: string): Promise<boolean>;
}
