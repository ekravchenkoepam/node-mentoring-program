import {
    Entity,
    PrimaryKey,
    Property,
    Collection,
    OneToMany
} from '@mikro-orm/postgresql';
import { Hobby } from '../hobby/hobby.entity';

@Entity()
export class User {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    surname!: string;

    @Property()
    email!: string;

    @OneToMany(() => Hobby, hobby => hobby.user)
    hobbies = new Collection<Hobby>(this);

    constructor(name: string, surname: string, email: string, hobbies?: Hobby[]) {
        this.name = name;
        this.surname = surname;
        this.email = email;

        if (hobbies) {
            this.hobbies.add(hobbies);
        }
    }
}