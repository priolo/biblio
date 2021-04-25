import styles from './input.module.scss';


function Input({
	//children,
	//icon,
	value,
	onChange
}) {

	const handleChange = e => onChange?.(e)

    return (
        <input 
			className={styles.root}
			type="text"
			onChange={handleChange}
			value={value}
        />
    )
}

export default Input
