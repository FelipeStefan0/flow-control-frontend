import { TypesActions } from "./TypesActions";

export interface Action {
    id: number;
    amount: Boolean;
    hours: Date;
    notes: string;
    types: TypesActions;
}