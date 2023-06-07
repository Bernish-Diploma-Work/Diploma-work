
import { ITextArea } from "./TextArea.interface";
import { forwardRef } from "react";
import styles from './TextArea.module.scss';

const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
    ({ error, style, ...rest }, ref) => {
        return <div className={styles.editor} style={style}>
            <textarea ref={ref} {...rest}></textarea>
            {error && <div className={styles.error}>{error.message}</div>}
        </div>
    }
)

export default TextArea