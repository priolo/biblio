import { AboutStore } from "@/stores/stacks/about"
import { TextEditorStore } from "@/stores/stacks/editor"
import { EditorCodeStore } from "@/stores/stacks/editorCode"
import { HelpStore } from "@/stores/stacks/help"
import { ViewLogStore } from "@/stores/stacks/log"
import { UsersStore } from "@/stores/stacks/streams"
import { UserStore } from "@/stores/stacks/streams/detail"
import { ViewStore } from "@/stores/stacks/viewBase"
import { DOC_TYPE } from "@/types"
import { FunctionComponent, useMemo } from "react"
import AboutView from "../../app/cards/about/View"
import EditorCodeView from "../../app/cards/editorCode/View"
import TextEditorView from "../../app/cards/editorTxt/View"
import HelpView from "../../app/cards/help/View"
import LogsView from "../../app/cards/mainLogs/View"
import StreamDetailView from "../../app/cards/user/detail/View"
import StreamsListView from "../../app/cards/user/list/ListView"
import UserView from "../../app/cards/account/View"
import { AccountStore } from "../../stores/stacks/account"



interface DocCmpProps {
	view: ViewStore,
}

/** Seleziona il contenuto da visualizzare in base al tipo di VIEW */
const PolymorphicCard: FunctionComponent<DocCmpProps> = ({
	view,
}) => {
	const content = useMemo(() => {
		switch (view.state.type) {

			case DOC_TYPE.USERS:
				return <StreamsListView store={view as UsersStore} />
			case DOC_TYPE.USER:
				return <StreamDetailView store={view as UserStore} />

			case DOC_TYPE.LOGS:
				return <LogsView store={view as ViewLogStore} />
			case DOC_TYPE.ABOUT:
				return <AboutView store={view as AboutStore} />
			case DOC_TYPE.TEXT_EDITOR:
				return <TextEditorView store={view as TextEditorStore} />
			case DOC_TYPE.CODE_EDITOR:
				return <EditorCodeView store={view as EditorCodeStore} />
			case DOC_TYPE.HELP:
				return <HelpView store={view as HelpStore} />

			case DOC_TYPE.ACCOUNT:
				return <UserView store={view as AccountStore} />

			default:
				return null
		}
	}, [view])
	return content
}

export default PolymorphicCard