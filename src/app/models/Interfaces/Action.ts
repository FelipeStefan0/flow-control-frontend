import { TypesActions } from "../Enum/TypesActions";

export interface Action {
    id: number;
    amount: number;
    hours: Date;
    notes: string;
    types: TypesActions;
}