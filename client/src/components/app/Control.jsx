import styles from './control.module.scss';


function Control({
	label,
	children,
}) {

	const handleChange = e => onChange?.(e)

    return (
        <label 
			className={styles.root}
        >
			<div className={styles.label}>{label}</div>
			{children}
		</label>
    )
}

export default Control
