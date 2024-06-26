import React, { useEffect, useRef, useState } from "react";
import style from './Container.module.scss'
import { Header } from "../Header/Header";
import { TextLorem } from "../TextLorem/TextLorem";
import { Tapbar } from "../Tapbar/Tapbar";

export const Container: React.FC = () => {

    const [scrollTop, setScrollTop] = useState(0)
    const [scrollBarActive, setScrollBarActive] = useState(false)
    const [scrollBarComplete, setScrollBarComplete] = useState(false)

    const container = useRef<any>(null)

    useEffect(() => {
        currentScrollTop()
        scrollendTop()
    }, [])

    function currentScrollTop() {
        container.current!.addEventListener('wheel', (e: any) => {
            const scrollTop = container.current!.scrollTop

            setScrollTop(scrollTop)
            setScrollBarActive(true)
            
            if (e.deltaY < 0) setScrollBarActive(false)
        });
    }

    function scrollendTop() {
        container.current!.addEventListener('scrollend', () => {
            setScrollBarActive(false)
        });
    }

    if (scrollTop > 200 && !scrollBarActive) {
        setTimeout(() => {
            setScrollBarComplete(true)
        }, 1000)
    }

    if (scrollTop > 200 && scrollBarActive) {
        setTimeout(() => {
            setScrollBarComplete(false)
        }, 0)
    }

    return (
        <div ref={container} className={style.container}>
            <Header />
            
            <TextLorem />
            <Tapbar
                scrollTop={scrollTop}
                scrollBarComplete={scrollBarComplete}
                container={container}
            />
            <p style={{
                height: '58px',
            }}></p>
        </div>
    )
}