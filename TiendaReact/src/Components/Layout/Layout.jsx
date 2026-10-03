import React from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";


export function Layout({children}){
    return(
    <div className={styles.layout}>
        
        <Header />

            <main className={styles.main}>
                <Outlet />
            </main>

        <Footer className={styles.footer}/>
    
    </div>
    
    )
}

