import React, { useEffect } from 'react'

import MenuLayout from './MenuLayout';
import ElementLayout from "./ElementLayout"
import PolyLayout from './PolyLayout';
import Tree from "../app/Tree"

import { useDoc } from "../../store/doc"
import { useMenu } from "../../store/menu"

import styles from './mainLayout.module.scss';




/**
 * Gestisce l'intera app 
 * @returns 
 */
function MainLayout() {

    const { state: docs, fetch: fetchDoc, open } = useDoc()
    const { state: menu, fetch: fetchMenu, setAll } = useMenu()

    useEffect(() => {
        fetchDoc()
        fetchMenu()
    }, [])

    const handleChangeExpanded = (value) => {
        //debugger
        setAll(value)
    }
    const handleClickNode = (node) => console.log(node)

    const handleClickMenu = (node) => {
        if (node.id == "login") {
            open({ type: "login" })
        }
    }

    return (
        <div className={styles.main}>

            <div className={styles.contAbs}>
                <div className={styles.contHorizDoc}>

                    <div className={styles.docLeftSpace} />

                    {docs.all.map((doc, index) => (
                        <ElementLayout key={doc.id}>
                            <PolyLayout content={doc} />
                        </ElementLayout>
                    ))}

                </div>
            </div>

            <div className={styles.contAbsMenu}>
                <div className={styles.contHorizMenu}>

                    <ElementLayout>
                        <MenuLayout
                            renderBottom={<Tree onClickNode={handleClickMenu} values={[
                                { label: "Login", id: "login" },
                                { label: "Signin", id: "signin" }
                            ]} />}
                        >
                            <Tree
                                values={menu.all}
                                onClickNode={handleClickNode}
                                onChangeExpanded={handleChangeExpanded}

                            />
                        </MenuLayout>
                    </ElementLayout>

                    <ElementLayout>
                        <MenuLayout >
                            ciccio
                        </MenuLayout>
                    </ElementLayout>

                </div>
            </div>
        </div>
    );
}

export default MainLayout


