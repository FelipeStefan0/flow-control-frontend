import { TypesActions } from "../Enum/TypesActions";

export interface Action {
    id: number;
    value: number;
    date: Date;
    description: string;
    type: TypesActions;
}