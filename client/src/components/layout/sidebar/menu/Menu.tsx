import { FC } from "react";
import { Line } from "../../../ui/misc/Line";
import { IMenu, IMenuItem } from "./Menu.interface";

import styles from './Menu.module.scss';
import { MenuItem } from "./MenuItem";

const Menu: FC<IMenu> = ({ title, items }) => {
    return <nav className={styles.menu_sidebar}>
        <h3>{title}</h3>
        <ul>
            {items.map((menuItem: IMenuItem) => (
                <MenuItem item={menuItem} key={menuItem.link} />
            ))
            }

        </ul>
        <Line />
    </nav>
}

export default Menu