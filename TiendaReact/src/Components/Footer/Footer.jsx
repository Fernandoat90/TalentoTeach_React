import styles from "./Footer.module.css";

function Footer(){
    return(
        <footer>
        <div className={styles.footContain}>
            <div>
                <h3>Contacto</h3>
                <a href="https://www.linkedin.com/in/fernando-torres-b13199237/" target="_blank">
                    <img src="/img/linkedin.png" title="linkedin" className={styles.img} />
                </a>
                
                <a href="https://github.com/Fernandoat90" target="_blank">
                <img src="/img/github.jpg" title="Github" className={styles.img}/>
                </a>
                
            </div>

            <div className={styles.col}>
                <h3>Fernando Torres</h3>
                <h4>Diseño</h4>
                <h4>Programación</h4>
            </div>

            <div>
                <img src="/img/mia.jpg"  title="Foto" className={styles.imgMia} />
            </div>
        </div>

        </footer>
        
    )
}

export default Footer;