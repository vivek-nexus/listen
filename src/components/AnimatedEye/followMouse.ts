import { QuerySelectorType, eye } from "./AnimatedEye.types"

export default function FollowMouse(event: MouseEvent, eye: eye) {
    const pupil: QuerySelectorType = document.querySelector(`#${eye}`)
    if (pupil) {
        const x = event.pageX - pupil.getBoundingClientRect().left
        const y = event.pageY - pupil.getBoundingClientRect().top
        const translateX = (x * 24) / (window.innerWidth)
        const translateY = (y * 64) / (window.innerHeight)
        pupil.style.transform = `translate(${translateX}px, ${translateY}px)`
    }
}