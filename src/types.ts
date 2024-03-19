import { CellContext, ColumnDef } from "@tanstack/react-table";

export type TBody = {
    children: React.ReactNode;
}

export type TColumn = ColumnDef<unknown, any>

export type TTable = {
    data: unknown[];
    columns: TColumn[];
    handleEdit: (cell: CellContext<unknown, any>) => void
    handleDelete: (cell: CellContext<unknown, any>) => void
}

export type TUserAccount = {
    [key: string]: any
}

export type TState = {
    userAccount: TUserAccount
}

export interface TAction {
    type: string;
    payload: any;
  }