import { v4 as uuidv4 } from 'uuid';
import { UserExtended } from "../../types";

const usersDb: UserExtended[] = [
    {
        id: uuidv4(),
        name: 'Emmanuel',
        surname: 'Mccormack',
        email: 'emmanuel.mccormack@epam.com',
        hobbies: ['fishing', 'cars'],
    },
    {
        id: uuidv4(),
        name: 'Lorena',
        surname: 'Cortes',
        email: 'lorena.cortes@epam.com',
        hobbies: ['sport', 'dancing'],
    },
    {
        id: uuidv4(),
        name: 'Jemima',
        surname: 'Cain',
        email: 'jemima.cain@epam.com',
        hobbies: ['cooking', 'clothes'],
    },
    {
        id: uuidv4(),
        name: 'Pauline',
        surname: 'Hale',
        email: 'pauline.hale@epam.com',
        hobbies: ['drawing', 'dancing'],
    },
];

export default usersDb