import CloseIcon from "../../imeges/close"
import styles from './dialog.module.scss';


function Dialog({
    isOpen,
    onClose,
    renderHead,
    children,
    renderFooter,
    width = "70%"
}) {



    // RENDER
    const cnDialog = `${styles.root} ${isOpen ? styles.visible_dlg : ""}`
    const cnDialogPage = `${styles.page} ${isOpen ? styles.visible_dlg : ""}`
    
    return (
        <div className={cnDialog} /*onClick={onClose}*/>
            <div className={cnDialogPage} style={{ width: width }}>
                <div className={styles.head}>
                    <div className={styles.head_title}>
                        {renderHead}
                    </div>
                    <div className={styles.head_close} onClick={onClose}>
                        <CloseIcon />
                    </div>
                </div>
                <div className={styles.body}>{children}</div>
                <div className={styles.footer}>{renderFooter}</div>
            </div>
        </div>
    )
}

export default Dialog