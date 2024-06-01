import FrameworkCard from "@/components/cards/FrameworkCard"
import { UserStore } from "@/stores/stacks/streams/detail"
import { EDIT_STATE } from "@/types"
import { useStore } from "@priolo/jon"
import { FunctionComponent, useEffect } from "react"
import ActionsCmp from "./Actions"
import Form from "./Form"



interface Props {
	store?: UserStore
}

const StreamDetailView: FunctionComponent<Props> = ({
	store: streamSo,
}) => {

	// STORE
	const streamSa = useStore(streamSo)
	useStore(streamSo.state.group)

	// HOOKs
	useEffect(() => {
		streamSo.fetchIfVoid()
	}, [])

	// HANDLER

	// RENDER
	const inRead = streamSa.editState == EDIT_STATE.READ

	return <FrameworkCard variantBg
		store={streamSo}
		actionsRender={<ActionsCmp store={streamSo} />}
	>
		<Form store={streamSo} />
	</FrameworkCard>
}

export default StreamDetailView
