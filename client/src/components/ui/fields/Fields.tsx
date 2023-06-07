import { forwardRef } from "react";
import { IField } from "./Fields.interface";
import styles from './Fields.module.scss';

const Field = forwardRef<HTMLInputElement, IField>(
    ({ error, type = 'text', style, ...rest }, ref) => {
        
        return <div className={styles.input} style={style}>
            <input ref={ref} type={type} {...rest}></input>
            {error && <div className={styles.error}>{error.message}</div>}
        </div>
    }
)

export default Field