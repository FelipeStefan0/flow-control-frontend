import { TypesActions } from "./TypesActions";

export interface Action {
    id: number;
    amount: number;
    hours: Date;
    notes: string;
    types: TypesActions;
}