import React from 'react'
import styles from './button.module.scss';


function Button({
	children,
	icon,
}) {
    return (
        <div className={styles.root}>
			{children && <div className={styles.label}>{children}</div>}
			{icon && <div className={styles.icon}>{icon}</div>}
        </div>
    )
}

export default Button
