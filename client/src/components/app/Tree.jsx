import styles from "./tree.module.scss"
import PlusIcon from "../../imeges/plus"
import MinusIcon from "../../imeges/minus"

/*
TREE-NODE
{
	id: any,
	label: string,
	children: <TREE-NODES>,
	expanded: bool,
}
*/
/**
 * Visualizza una lista di LIST-TREE-NODES 
 * tramite il valore "values" array di TREE-NODES
 * @param {*} param0 
 * @returns 
 */
export function Tree({
	values,
	onClickNode,
	onChangeExpanded,
}) {
	if (!values) return null

	const handleChangeExpanded = node => {
		const newValues = [...values]
		onChangeExpanded(newValues)
	}

	return (<div className={styles.container}>
		{values?.map((value, index) => (

			<TreeItem value={value} key={index}
				onClickNode={onClickNode}
				onChangeExpanded={handleChangeExpanded}
			/>

		)) ?? null}
	</div>)
}

export default Tree



function TreeItem({
	value,
	onClickNode,
	onChangeExpanded,
}) {

	const handleClickNode = e => onClickNode(value)
	const handleClickIcon = e => {
		//const newValue = { ...value, expanded: true}
		value.expanded = !value.expanded
		onChangeExpanded()
	}


	if (!value) return null
	return (<div className={styles.container}>

		<div className={styles.label} >
			<div className={styles.icon} onClick={handleClickIcon}>
				{(value.children && value.children.length>0) && (
					value.expanded ? <PlusIcon  /> : <MinusIcon />
				)}
			</div>
			<div className={styles.text}
				onClick={handleClickNode}
			>{value.label}</div>
		</div>

		{value.expanded && (<div className={styles.list}>
			{value.children?.map((child, index) => (

				<TreeItem key={index}
					value={child}
					onClickNode={onClickNode}
					onChangeExpanded={onChangeExpanded}
				/>

			)) ?? null}
		</div>)}

	</div>)
}
