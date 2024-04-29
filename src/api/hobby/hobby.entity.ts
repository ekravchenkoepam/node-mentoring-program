import {
    Entity,
    PrimaryKey,
    Property,
    ManyToOne
} from "@mikro-orm/postgresql";
import { User } from "../users/user.entity";

@Entity()
export class Hobby {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @ManyToOne(() => User)
    user!: User;

    constructor(name: string, user: User) {
        this.name = name;
        this.user = user;
    }
}