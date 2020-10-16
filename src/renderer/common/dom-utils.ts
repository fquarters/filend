const elementVisibleInScrollableContainer = (element: HTMLElement,
    container: HTMLElement): boolean => {

    const elementTop = element.offsetTop
    const elementHeight = element.clientHeight
    const elementBottom = elementTop + elementHeight
    
    const containerTop = container.scrollTop
    const containerHeight = container.clientHeight
    const containerBottom = containerTop + containerHeight

    const tooLow = elementBottom > containerBottom
    const tooHigh = elementTop < containerTop

    return !(tooHigh || tooLow)
}

export {
    elementVisibleInScrollableContainer
}