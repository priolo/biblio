import docsSo, { FIXED_CARD } from "@/stores/docs"
import { deckCardsSo } from "@/stores/docs/cards"
import { menuSo } from "@/stores/docs/links"
import { buildTextEditor } from "@/stores/stacks/editor/utils/factory"
import { ClearSession, LoadSession, SaveSession } from "@/utils/session/startup"
import { useStore } from "@priolo/jon"
import React, { FunctionComponent } from "react"
import Button from "../../components/buttons/Button"
import AboutButton from "./AboutButton"
import cls from "./MainMenu.module.css"
import StoreButton from "./StoreButton"
import MenuButton from "./MenuButton"
import EditorIcon from "@/icons/EditorIcon"
import HelpIcon from "@/icons/HelpIcon"
import { buildUserCard } from "@/stores/stacks/account/utils/factory"
import { buildUsers } from "../../stores/stacks/streams/utils/factory"



interface Props {
	style?: React.CSSProperties
}

const MainMenu: FunctionComponent<Props> = ({
	style,
}) => {

	// STORE
	const menuSa = useStore(menuSo)
	useStore(docsSo)

	// HOOKS

	// HANDLERS
	const handleOpenEditor = () => {
		const view = buildTextEditor("ciao!")
		deckCardsSo.add({ view, anim: true })
	}
	const handleHelp = () => window.open("https://natsnui.app/help/")
	const handleUser = () => {
		const view = buildUserCard()
		deckCardsSo.add({ view, anim: true })
	}
	const handleUsers = () => {
		const view = buildUsers()
		deckCardsSo.add({ view, anim: true })
	}

	// RENDER
	if (!docsSo.state?.fixedViews) return null
	//const views = menuSa.all

	return <div style={style} className={cls.root}>

		{/* <StoreButton
			label="ALL"
			store={docsSo.state.fixedViews[FIXED_CARD.CONNECTIONS]}
		/>

		{views.map((view) => (
			<StoreButton key={view.state.uuid}
				store={view}
			/>
		))} */}

		<div style={{ flex: 1 }} />

		{/* *** DEBUG *** */}
		{process.env.NODE_ENV === 'development' && <>
			<Button children="SAVE" onClick={() => SaveSession()} />
			<Button children="LOAD" onClick={() => LoadSession()} />
			<Button children="RESET" onClick={() => ClearSession()} />
		</>}
		{/* *** DEBUG *** */}

		{/* <StoreButton
			label="HELP"
			store={docSo.state.fixedViews[FIXED_CARD.HELP]}
		/> */}

		<MenuButton 
			title={"USER"}
			subtitle={"SEI TU!"}
			onClick={handleUser}
		>
			<HelpIcon style={{ width: 20 }} className="color-fg" />
		</MenuButton>

		<MenuButton 
			title={"USERS"}
			subtitle={"TUTTI GLI ALTRI"}
			onClick={handleUsers}
		>
			<HelpIcon style={{ width: 20 }} className="color-fg" />
		</MenuButton>

		<StoreButton
			label="LOG"
			store={docsSo.state.fixedViews[FIXED_CARD.LOGS]}
		/>

		<MenuButton 
			title="A little reminder"
			subtitle="NOTE"
			onClick={() => handleOpenEditor()}
		>
			<EditorIcon style={{ width: 20 }} className="color-fg" />
		</MenuButton>

		<AboutButton />

	</div>
}

export default MainMenu
