import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

export type TBody = {
    children: React.ReactNode;
}

export type TColumn = ColumnDef<unknown, any>

export type TTable = {
    data: unknown[];
    columns: TColumn[];
    setRowToUpdate: Dispatch<SetStateAction<TGenericObject>>
    handleDelete: (cell: CellContext<unknown, any>) => void
}

export type TGenericObject = {
    [key: string]: any
}

export type TUserAccount = TGenericObject
export type TState = {
    userAccount: TUserAccount
}

export interface TAction {
    type: string;
    payload: any;
}

export type TEditEntity = {
    pageName: string;
    entity: TGenericObject;
    handleEdit: (editedProperties: TGenericObject) => void
    HandleCancel: Dispatch<SetStateAction<TGenericObject>>
}

export type TSummaryCard = {
    bgColor: {
        from: string,
        to: string
    }
    icon: string
    amount: string
    description: string
}

export type TSummaryCardData = {
    Sales: TSummaryCard | undefined
    Subscriptions: TSummaryCard | undefined
    Users: TSummaryCard | undefined
    Plans: TSummaryCard | undefined
}