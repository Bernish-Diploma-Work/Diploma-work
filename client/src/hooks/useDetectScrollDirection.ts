import { useEffect, useState } from "react"
import { useIsMobile } from "./useMobile";


export const useDetectScrollDirection = () => {

    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isScrollDown, setIsScrollDown] = useState(false);
    const {isMobile} = useIsMobile();

    useEffect(() => {
        if (!isMobile) return;
        const detectScroll = (e: Event): void => {
            const target = e.currentTarget as Window;
            const scrollPos = target.scrollY;
            if (lastScrollTop < scrollPos) {
                setIsScrollDown(true);
               
            } else {
                setIsScrollDown(false);
               
            }
            scrollPos <= 0 ?  setLastScrollTop(0) : setLastScrollTop(scrollPos);
        }

        window.addEventListener('scroll', detectScroll);

        return () => {
            window.removeEventListener('scroll', detectScroll);
        }
        
    }, [lastScrollTop, isMobile])

    return isScrollDown;
}