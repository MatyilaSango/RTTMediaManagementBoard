import { ColumnDef } from "@tanstack/react-table";

export type TBody = {
    children: React.ReactNode;
}

export type TColumn = ColumnDef<unknown, any>

export type TTable = {
    data: unknown[];
    columns: TColumn[]
}

export type TState = {
    userAccount: {
        [key: string]: any
    };
}

export interface TAction {
    type: string;
    payload: any;
  }