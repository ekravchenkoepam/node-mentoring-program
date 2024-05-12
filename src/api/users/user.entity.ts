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
    name?: string;

    @Property()
    surname?: string;

    @Property({ unique: true })
    email!: string;

    @Property()
    role!: string;

    @Property()
    password!: string;

    @OneToMany(() => Hobby, hobby => hobby.user)
    hobbies = new Collection<Hobby>(this);

    constructor(
        email: string,
        password: string,
        role: string,
        name?: string,
        surname?: string,
        hobbies?: Hobby[]
    ) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.name = name;
        this.surname = surname;

        if (hobbies) {
            this.hobbies.add(hobbies);
        }
    }
}