import { FC } from "react";

import styles from './Heading.module.scss';

export const Heading: FC<{ title: string }> = ({ title }) => {

    return (
        <div className={styles.heading}>
            <h2>{title}</h2>

        </div>
    )
}