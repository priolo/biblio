
import styles from "./elementLayout.module.scss"



/*
ELEMENT
*/

function ElementLayout ({
    children
}) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}


export default ElementLayout