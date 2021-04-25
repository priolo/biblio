import { useEffect, useRef } from 'react';
import styles from './snackbar.module.scss';


function Snackbar({
	isOpen,
	onClose,
	type,
	text
}) {

	// HOOKs
	const idTimerRef = useRef(null)
	useEffect(()=>{

		const stopTimer = () => {
			if ( idTimerRef.current!=null ) clearTimeout(idTimerRef.current);
			idTimerRef.current = null;
		}
	
		const startTimer = () => {
			idTimerRef.current = setTimeout ( ()=>{
				onClose();
				idTimerRef.current = null;
			}, 3000 )
		}

		stopTimer()
		if ( isOpen ) startTimer()
	
	},[isOpen])

	const cnContent = `${styles.root} ${styles[type] ?? styles.info} ${isOpen ? styles.visible_dlg : ""}`

	return <span className={cnContent}>
		{text}
	</span>
}

export default Snackbar
