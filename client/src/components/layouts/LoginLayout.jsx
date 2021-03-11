
import CloseIcon from "../../imeges/close"
import Button from "../app/Button"

import styles from "./loginLayout.module.scss"



function LoginLayout ({
	content
}) {
	return (
		<div className={styles.container}>

			<div className={styles.left}>
			</div>


			<div className={styles.center}>

				<div className={styles.header}>
					<div className={styles.title}>LOGIN</div>
				</div>

				<div className={styles.body}>
					LOGIN
				</div>

			</div>


			<div className={styles.rigth}>
				<div className={styles.icons}>
					<Button icon={<CloseIcon />} />
				</div>
			</div>
			
		</div>
	)
}

export default LoginLayout