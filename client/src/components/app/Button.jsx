import React from 'react'
import styles from './button.module.scss';


function Button({
	children,
	icon,
	onClick
}) {
    return (
        <div className={styles.root} onClick={onClick}>
			{children && <div className={styles.label}>{children}</div>}
			{icon && <div className={styles.icon}>{icon}</div>}
        </div>
    )
}

export default Button
