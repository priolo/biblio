import React, { useEffect } from 'react'
import MenuContainer from '../menu/MenuContainer';
import DocContainer from '../doc/DocContainer';
import styles from './main.module.css';

import { useDoc } from "../../store/doc"

function MainLayout() {

    const { state: docs, fetch } = useDoc()

    useEffect(()=>{
        fetch()
    },[])

    return (
        <div className={styles.main}>

            <div className={styles.contAbs}>
                <div className={styles.contHorizDoc}>

                    <div className={styles.docLeftSpace} />

                    {docs.all.map ( doc => (
                        <Element>
                            <DocContainer />
                        </Element>
                    ))}

                </div>
            </div>

            <div className={styles.contAbsMenu}>
                <div className={styles.contHorizMenu}>

                    <Element>
                        <MenuContainer />
                    </Element>

                    <Element>
                        <MenuContainer />
                    </Element>

                </div>
            </div>
        </div>
    );
}

export default MainLayout



function Element({
    children
}) {
    return (
        <div className={styles.elemen}>
            {children}
        </div>
    )
}