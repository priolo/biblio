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

	const [txt, setTxt] = useState(element.code ?? "")
	//const editor = useSlate();
	const editor = useSlateStatic();
	const selected = useSelected();
	const focused = useFocused();

	const containerRef = useRef(null)

	// const handleChange = (newValue:string, ev: editor.IModelContentChangedEvent) => {
	// 	const path = ReactEditor.findPath(editor, element);
	// 	Transforms.setNodes(
	// 		editor,
	// 		{ code: newValue },
	// 		{ at: path }
	// 	)
	// }
	const handleChange2 = (newValue: string, ev: editor.IModelContentChangedEvent) => {
		setTxt(newValue)
		const path = ReactEditor.findPath(editor, element)
		//editor.insertText(newValue, { at: path })
		editor.setNodes(
			{ code: newValue },
			{ at: path }
		)
	}

	const handleChange = (e) => {
		const newValue = e.target.value
		setTxt(newValue)
		const path = ReactEditor.findPath(editor, element);
		// Transforms.setNodes(
		// 	editor,
		// 	{ text: newValue },
		// 	{ at: [path[0],0] }
		// )
		//editor.insertText(newValue, { at: path })
	}

	// const handleChange = (e) => {
	// 	const newValue = e.target.value
	// 	const path = ReactEditor.findPath(editor, element);
	// 	editor.insertText(newValue, { at: path })
	// }

	const onEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
		editor.onDidChangeModelContent(() => {
			const lineCount = editor.getModel().getLineCount();
			const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
			const editorHeight = lineCount * lineHeight;
			containerRef.current.style.height = `${editorHeight}px`;
			editor.layout();
		});
		// editor.setPosition({lineNumber: 1, column: 6})
		// editor.focus()
		// editor.getModel().onDidChangeContent((event) => {
		// 	console.log('Il contenuto è cambiato:', event);
		// 	// Puoi aggiungere qui la logica per gestire il cambiamento
		// })
	}

	// RENDER
	//const value = element.children?.[0]?.text ?? ""
	//const value = element.code ?? ""
	const value = txt

	return (
		<div {...attributes}
			contentEditable={false}
			
		>
			{/* <input
					onChange={handleChange}
					value={value}
				/> */}
<div ref={containerRef}>
			<Editor
				//height="200px"
				language="javascript"
				theme="vs-dark"
				value={value}
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


			{/* {children} */}

		</div>
	)
}

export default Code

