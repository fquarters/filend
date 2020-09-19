const modalRootId = "___modal-root"
const modalRootClassname = "modal"
const modalRootVisibleClassname = "modal--visible"
const modalBackdropClassname = "modal__backdrop"
const modalBackdropVisibleClassname = "modal__backdrop--visible"

const getModalRoot = (): HTMLElement => {

    const root = document.getElementById(modalRootId)
    if (!root) {

        const root = document.createElement('div')
        root.className = "modal"
        root.id = "___modal-root"

        const backdrop = document.createElement('div')
        backdrop.className = modalBackdropClassname

        root.appendChild(backdrop)
        document.body.appendChild(root)

        return root
    }

    return root
}

export {
    modalRootId,
    modalBackdropClassname,
    modalRootClassname,
    modalRootVisibleClassname,
    modalBackdropVisibleClassname,
    getModalRoot
}