const elementVisibleInScrollableContainer = (element: HTMLElement,
    container: HTMLElement): boolean => {

    const rowTop = element.offsetTop
    const rowHeight = element.clientHeight
    const rowBottom = rowTop + rowHeight
    
    const containerTop = container.scrollTop
    const containerHeight = container.clientHeight
    const containerBottom = containerTop + containerHeight

    const tooLow = rowBottom > containerBottom
    const tooHigh = rowTop < containerTop

    return !(tooHigh || tooLow)
}

export {
    elementVisibleInScrollableContainer
}