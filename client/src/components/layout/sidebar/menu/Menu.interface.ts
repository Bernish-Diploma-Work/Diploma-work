import { IconType } from "react-icons";

export interface IMenuItem {
    title: string,
    link: string,
    icon?: IconType,
    image?: string,
}

export interface IMenu {
    title: string;
    items: IMenuItem[]
}