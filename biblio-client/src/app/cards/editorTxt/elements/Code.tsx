import { ElementCode } from "@/stores/stacks/editor/slate/types";
import Editor from "@monaco-editor/react";
import { FunctionComponent, useEffect, useRef } from "react";
import { BaseEditor, Transforms } from "slate";
import { ReactEditor, RenderElementProps, useFocused, useSelected, useSlate, useSlateStatic } from "slate-react";



interface Props extends RenderElementProps {
	element: ElementCode
}



const Code: FunctionComponent<Props> = ({
	attributes,
	element,
	children,
}) => {

	//const editor = useSlate();
	const editor = useSlateStatic();
	const selected = useSelected();
	const focused = useFocused();

	const handleChange = (newValue) => {
		const path = ReactEditor.findPath(editor, element);
		Transforms.setNodes(
			editor,
			{ code: newValue },
			{ at: path }
		)
	}
	const onEditorDidMount = (editor:BaseEditor) => {
		// editor.setPosition({lineNumber: 1, column: 6})
		// editor.focus()
		editor.getModel().onDidChangeContent((event) => {
			console.log('Il contenuto è cambiato:', event);
			// Puoi aggiungere qui la logica per gestire il cambiamento
		});
	}

	return (
		<div {...attributes}>
			<Editor
				height="200px"
				language="javascript"
				theme="vs-dark"
				value={element.code || ''}
				onChange={handleChange}
				onMount={onEditorDidMount}
				options={{
					minimap: { enabled: false },
					scrollBeyondLastLine: false,
				}}
			/>
		</div>
	)
}

export default Code

