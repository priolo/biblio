import CloseIcon from "../../imeges/close"
import { useDoc } from "../../store/doc"

import Button from "../app/Button"

import styles from "./docLayout.module.scss"



function DocLayout ({
	content
}) {

	// HOOKs
	const { state:doc, close } = useDoc()




	// HANDLE
	const handleClickClose = e => close(content.id)

	return (
		<div className={styles.container} >

			<div className={styles.left}>
				<div className={styles.headerSpace} />
				<div className={styles.menu}>
					<div className={styles.link}>Link uno</div>
					<div className={styles.link}>Link due</div>
					<div className={styles.link}>Link tre</div>
					<div className={styles.link}>Link quattro</div>
					<div className={styles.link}>Link cinque</div>
				</div>
			</div>


			<div className={styles.center}>

				<div className={styles.header}>
					<div className={styles.title}>{content.title}</div>
					<div className={styles.subtitle}>
						<span className={styles.author}>{content.author}</span>
						<span className={styles.date}>{content.date}</span>
					</div>
				</div>

				<div className={styles.body}>
					{content.body}
				</div>

			</div>


			<div className={styles.rigth}>
				<div className={styles.icons}>
					<Button icon={<CloseIcon />} 
						onClick={handleClickClose}
					/>
				</div>
			</div>
			
		</div>
	)
}

export default DocLayout