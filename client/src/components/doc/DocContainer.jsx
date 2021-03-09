import styles from "./doc.module.css"
import CloseIcon from "../../imeges/close"
import Button from "../app/Button"

function MenuContainer () {
	return (
		<div className={styles.container}>

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
					<div className={styles.title}>Title di questo Documento</div>
					<div className={styles.subtitle}>
						<span className={styles.author}>Priolo22</span>
						<span className={styles.date}>12/02/2021</span>
					</div>
				</div>

				<div className={styles.body}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sapien massa. Nulla ornare, augue sed vestibulum feugiat, mi quam tempus tortor, in hendrerit libero leo in nisl. Nam molestie mauris non nunc fermentum, eget pellentesque turpis porttitor. Pellentesque vestibulum facilisis ligula, ut pulvinar diam porttitor nec. In vulputate molestie ante at vestibulum. Pellentesque gravida eros in ligula hendrerit egestas. Etiam quis purus elementum, semper nibh sed, ultrices lacus. In ultricies rutrum suscipit. Vestibulum in sollicitudin enim. Curabitur eget imperdiet urna, eu facilisis neque. Nunc nibh sapien, congue et urna et, ullamcorper hendrerit mauris. Maecenas et sagittis mauris. Praesent quis tortor turpis. Vivamus maximus leo vel dignissim pretium. Donec tempor purus vel neque gravida, at tempus orci condimentum.
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

export default MenuContainer