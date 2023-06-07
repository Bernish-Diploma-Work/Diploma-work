import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import { mockups } from "../../../../assets/mockups/images";
import { useAuth } from "../../../../hooks/useAuth";
import { IMenuItem } from "./Menu.interface";
import styles from './Menu.module.scss';

export const MenuItem: FC<{ item: IMenuItem }> = memo(({ item }) => {
    const { user } = useAuth();
    let link = item.link;
    if (item.link === '/channel') {
        if (!user) return null
        link = `/channel/${user?.id}`
    }


    return <li>
        <NavLink to={link} className={({ isActive }) => isActive ? styles.active : ''}>
            <span className={item.image ? styles.image : ''}>
                {item.icon && <item.icon />}
                {item.image && <img
                    src={item.image}
                    alt={item.title}
                    width={40} height={40}
                    onError={(e: any) => { e.target.onerror = null; e.target.src = mockups.defaultAvatar }} />
                }
            </span>
            <p>{item.title}</p>
        </NavLink>

    </li>
})