import { ElementCode } from "@/stores/stacks/editor/slate/types";
import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { FunctionComponent, useEffect, useRef, useState } from "react";
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

	// HOOK
	const [txt, setTxt] = useState(element.code ?? "")
	const editor = useSlateStatic();
	const containerRef = useRef(null)

	// HANDLER
	const handleChange2 = (newValue: string, ev: editor.IModelContentChangedEvent) => {
		setTxt(newValue)
		const path = ReactEditor.findPath(editor, element)
		editor.setNodes(
			{ code: newValue },
			{ at: path }
		)
	}

	const onEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {

		function updateHeight () {
			const lineCount = editor.getModel().getLineCount();
			const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
			const editorHeight = lineCount * lineHeight + 15;
			containerRef.current.style.height = `${editorHeight}px`;
			editor.layout();
		}
		updateHeight()

		// quando il modello nell'editor cambia
		editor.onDidChangeModelContent(() => {
			console.log("onDidChangeModelContent")
			updateHeight()
		})
	}

	// RENDER
	return (
		<div {...attributes}
			contentEditable={false}
		>
			<div ref={containerRef}>
				<Editor
					//height="200px"
					language="javascript"
					theme="vs-dark"
					value={txt}
					onChange={handleChange2}
					onMount={onEditorDidMount}
					options={{
						minimap: { enabled: false },
						scrollBeyondLastLine: false,
						lineNumbers: "off",
						automaticLayout: true,
					}}
				/>
			</div>

			{children}

		</div>
	)
}

export default Code

