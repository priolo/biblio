import styles from "./menuLayout.module.scss"


function MenuLayout({
	children,
	renderBottom	// render visualizzato in basso
}) {
	return (
		<div className={styles.container}>
			<div className={styles.top}>
				{children}
			</div>
			<div className={styles.bottom}>
				{renderBottom}
			</div>			
		</div>
	)
}

export default MenuLayout