import { useLayout } from '../../store/layout';
import Button from './Button'
import Dialog from './Dialog'
import Snackbar from './Snackbar';


export default function MsgBox({
}) {

	// HOOKs
	const { state: layout, dialogClose } = useLayout()
	//const cnDialog = () => `ii_dlg ${isOpen ? "visible-dlg" : ""}`;
	//const cnDialogPage = () => `ii_dlg_page ${isOpen ? "visible-dlg" : ""}`;


	// HANDLEs
	const handleClose = e => dialogClose(false)
	const handleConfirm = e => dialogClose(true)


	// RENDER
	const { title, text, labelOk, labelCancel, modal, type } = layout.dialogOptions

	return modal ? (
		<Dialog width="50%"
			isOpen={layout.dialogIsOpen}
			onClose={handleClose}
			renderHead={<div>{title}</div>}
			renderFooter={<>
				<Button
					type="primary"
					onClick={handleConfirm}
				>{labelOk}</Button>
				<Button
					onClick={handleClose}
				>{labelCancel}</Button>
			</>}
		>
			{/* <Flex margin="10px 0">
				<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
			</Flex> */}
			{text}
		</Dialog>
	) : (
		<Snackbar
			isOpen={layout.dialogIsOpen}
			onClose={handleClose}
			type={type}
			text={text}
		/>
	)
}