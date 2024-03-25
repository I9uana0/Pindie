'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import "@/app/globals.css"
import Styles from "@/app/components/Header/Header.module.css"
import { Overlay } from "../Overlay/Overlay"
import { Popup } from "../Popup/Popup"
import { AuthForm } from "../AuthForm/AuthForm"
import { endpoints } from "@/app/api/config"
import { getJWT, getMe, isResponseOk, removeJWT } from "@/app/api/api-utils"

export const Header = () => {
    const [popupIsOpened, setPopupIsOpened] = useState(false);
    const [isAuthtorised, setIsAuthorised] = useState(false);

    const pathName = usePathname()

    const openPopup = (popupIsOpened) => {
        setPopupIsOpened(true);
    }

    const closePopup = () => {
        setPopupIsOpened(false);
    }

    useEffect(() => {
        const jwt = getJWT();
        if (jwt) {
            getMe(endpoints.me, jwt).then((userData) => {
                if (isResponseOk(userData)) {
                    setIsAuthorised(true);
                } else {
                    setIsAuthorised(false);
                    removeJWT()
                }
            })
        }
    }, [])

    const handleLogout = () => {
        setIsAuthorised(false);
        removeJWT()
    }

    return (
        <header className={Styles["header"]}>
            {pathName === "/" ? <div className={Styles.logo}><img className={Styles["logoimage"]} src="./images/logo.svg" alt="Логотип Pindie" /> </div> :
                <Link href="/" className={Styles.logo}>
                    <img className={Styles["logoimage"]} src="../images/logo.svg" alt="Логотип Pindie" />
                </Link>
            }
            <nav className={Styles["menu"]}>
                <ul className={Styles["menu__list"]}>
                    <li className={Styles["menu__item"]}>
                        <Link href="/new" className={`${Styles["menu__link"]} ${pathName === '/new' && Styles['menu__link_active']}`}>Новинки</Link>
                    </li>
                    <li className={Styles["menu__item"]}>
                        <Link href="/popular" className={`${Styles["menu__link"]} ${pathName === '/popular' && Styles['menu__link_active']}`}>Популярные</Link>
                    </li>
                    <li className={Styles["menu__item"]}>
                        <Link href="/shooter" className={`${Styles["menu__link"]} ${pathName === '/shooter' && Styles['menu__link_active']}`}>Шутеры</Link>
                    </li>
                    <li className={Styles["menu__item"]}>
                        <Link href="/runner" className={`${Styles["menu__link"]} ${pathName === '/runner' && Styles['menu__link_active']}`}>Ранеры</Link>
                    </li>
                    <li className={Styles["menu__item"]}>
                        <Link href="/pixel" className={`${Styles["menu__link"]} ${pathName === '/pixel' && Styles['menu__link_active']}`}>Пиксельные</Link>
                    </li>
                    <li className={Styles["menu__item"]}>
                        <Link href="/TDS" className={`${Styles["menu__link"]} ${pathName === '/TDS' && Styles['menu__link_active']}`}>TDS</Link>
                    </li>
                </ul>
                <div className={Styles["auth"]}>
                    {isAuthtorised ? (
                        <button className={Styles["auth__button"]} onClick={handleLogout}>Выйти</button>
                    ) : (
                        <button className={Styles["auth__button"]} onClick={openPopup}>Войти</button>
                    )
                    }
                </div>
            </nav>
            <Overlay isOpened={popupIsOpened} closePopup={closePopup} />
            <Popup isOpened={popupIsOpened} closePopup={closePopup}>
                <AuthForm close={closePopup} setAuth={setIsAuthorised} />
            </Popup>
        </header>
    );
}