
import CloseIcon from "../../imeges/close"
import Control from "../app/Control"
import Button from "../app/Button"
import Input from "../app/Input"

import styles from "./registerLayout.module.scss"
import { useAuth } from "../../store/auth"



function RegisterLayout() {

	// HOOKs
	const { state: auth, setEmail, register } = useAuth()

	// HANDLEs
	const handleChangeEmail = e => setEmail(e.target.value)
	const handleClickRegister = e => register()

	// RENDER
	
	return (
		<div className={styles.container}>

			<div className={styles.left}>
			</div>


			<div className={styles.center}>

				<div className={styles.header}>
					<div className={styles.title}>REGISTER</div>
				</div>

				<div className={styles.body}>
					<Control label="Email">
						<Input
							value={auth.email}
							onChange={handleChangeEmail}
						/>
					</Control>
					<Button onClick={handleClickRegister}>
						Register
					</Button>
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

export default RegisterLayout