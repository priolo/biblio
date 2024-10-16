import HelpIcon from "@/icons/HelpIcon"
import docsSo, { FIXED_CARD } from "@/stores/docs"
import { deckCardsSo } from "@/stores/docs/cards"
import { menuSo } from "@/stores/docs/links"
import { buildUserCard } from "@/stores/stacks/account/utils/factory"
import { ClearSession, EndSession, StartSession } from "@/plugins/session"
import { Button } from "@priolo/jack"
import { useStore } from "@priolo/jon"
import React, { FunctionComponent } from "react"
import { buildStore } from "../../stores/docs/utils/factory"
import { AccountState, AccountStore } from "../../stores/stacks/account"
import { TextEditorState, TextEditorStore } from "../../stores/stacks/editor"
import { buildUsers } from "../../stores/stacks/streams/utils/factory"
import { DOC_TYPE } from "../../types"
import AboutButton from "./AboutButton"
import cls from "./MainMenu.module.css"
import MenuButton from "./MenuButton"
import StoreButton from "./StoreButton"
import { NODE_TYPES } from "../../stores/stacks/editor/slate/types"



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
	const handleUser = () => {
		const view = buildUserCard()
		deckCardsSo.add({ view, anim: true })
	}
	const handleUsers = () => {
		const view = buildUsers()
		deckCardsSo.add({ view, anim: true })
	}
	const handleAccount = () => {
		const view = buildStore({
			type: DOC_TYPE.ACCOUNT,
		} as AccountState) as AccountStore
		deckCardsSo.add({ view, anim: true })
	}

	const handleDocNew = () => {
		const view = buildStore({
			type: DOC_TYPE.TEXT_EDITOR,
		} as TextEditorState) as TextEditorStore
		deckCardsSo.add({ view, anim: true })
	}
	const handleDocTest = () => {
		const view = buildStore({
			type: DOC_TYPE.TEXT_EDITOR,
			docId: "test-uuid",
		} as TextEditorState) as TextEditorStore
		deckCardsSo.add({ view, anim: true })
	}
	const handleDocDev = () => {
		const view = buildStore({
			type: DOC_TYPE.TEXT_EDITOR,
			initValue: [{ type: NODE_TYPES.CODE, children: [{ text: "var c = 67" }] }]
		} as TextEditorState) as TextEditorStore
		deckCardsSo.add({ view, anim: true })
	}


	// RENDER
	return <div style={style} className={cls.root}>

		{/* *** DEBUG *** */}
		{process.env.NODE_ENV === 'development' && <>
			<Button children="SAVE" onClick={() => EndSession()} />
			<Button children="LOAD" onClick={() => StartSession()} />
			<Button children="RESET" onClick={() => ClearSession()} />
			
			<Button children="DOC NEW" onClick={handleDocNew} />
			<Button children="DOC TEST" onClick={handleDocTest} />
			<Button children="DOC DEV" onClick={handleDocDev} />

			<Button children="ACCOUNT" onClick={handleAccount} />
		</>}
		{/* *** DEBUG *** */}

		<MenuButton 
			title={"USER"}
			subtitle={"SEI TU!"}
			onClick={handleUser}
		>
			<HelpIcon style={{ width: 20 }}/>
		</MenuButton>

		<MenuButton 
			title={"USERS"}
			subtitle={"TUTTI GLI ALTRI"}
			onClick={handleUsers}
		>
			<HelpIcon style={{ width: 20 }}/>
		</MenuButton>

		<StoreButton
			label="LOG"
			store={docsSo.state.fixedViews?.[FIXED_CARD.LOGS]}
		/>

		<AboutButton />

	</div>
}

export default MainMenu
