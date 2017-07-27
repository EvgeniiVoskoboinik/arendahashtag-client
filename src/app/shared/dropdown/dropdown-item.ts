export type DropdownId = string | number;

export interface DropdownItem<TId extends DropdownId = string> {
    id: TId;
    title: string;
}