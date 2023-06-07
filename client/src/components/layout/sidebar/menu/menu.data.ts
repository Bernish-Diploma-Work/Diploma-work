import { IMenuItem } from "./Menu.interface";
import { HiHome, HiChartBar, HiCollection, HiStar } from "react-icons/hi";

export const MenuArr: IMenuItem[] = [
  {
    title: "Головна",
    link: "/",
    icon: HiHome,
  },
  {
    title: "Популярне",
    link: "/popular",
    icon: HiChartBar,
  },
  {
    title: "Підписки",
    link: "/subscriptions",
    icon: HiCollection,
  },
  {
    title: "Мій канал",
    link: "/channel",
    icon: HiStar,
  },
];
