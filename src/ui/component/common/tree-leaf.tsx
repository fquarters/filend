import React, { ReactNode, useState, useCallback, useContext, useMemo } from "react"
import { BiConsumer } from "../../../common/types"
import { DropdownComponentContext } from "./dropdown"
import { all } from "../../../common/collections"
import { Row, Column } from "./bulma-wrappers"

export type TreeNode<K extends React.Key> = {
    children?: TreeNode<K>[],
    label: ReactNode,
    key: K,
    searchBy: string
}

type LeafProps<K extends React.Key> = {
    node: TreeNode<K>,
    level: number,
    value: K[],
    onChange: BiConsumer<TreeNode<K>, boolean>
}

const unfoldBtnStyle = {
    minWidth: 16
}

const TreeLeaf = <K extends React.Key>({
    node,
    level,
    onChange,
    value
}: LeafProps<K>) => {

    const [unfolded, setUnfolded] = useState<boolean>(false)

    const toggleFolder = useCallback(() => setUnfolded((current) => !current), [])

    const toggleCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(node, e.target.checked),
        [onChange])

    const context = useContext(DropdownComponentContext)!

    const preventBlur = useCallback(() => {

        context.clicking.current = true
        context.inputRef.current?.focus()

    }, [context.clicking, context.inputRef])

    const matchesSearch = context.matchesSearch(node.searchBy)

    const checked = useMemo(() => {

        if (node.children) {
            return all(node.children, (child) => value.indexOf(child.key) > -1)
        } else {
            return value.indexOf(node.key) > -1
        }

    }, [value, node.children])

    return <React.Fragment>
        {
            matchesSearch
            && <div className={`dropdown-item pl-${4 + 2 * level} pr-6`}
                onMouseDown={preventBlur}>
                <Row>
                    {
                        node.children?.length && <div className="column is-narrow">
                            <div onClick={toggleFolder} style={unfoldBtnStyle}>
                                <span>{unfolded ? '-' : '+'}</span>
                            </div>
                        </div>
                    }
                    <Column className="px-1" narrow>
                        <input type="checkbox"
                            checked={checked}
                            onChange={toggleCheckbox} />
                    </Column>
                    <Column>
                        {node.label}
                    </Column>
                </Row>
                {
                    node.children &&
                    unfolded && <div>
                        {node.children.map((child) => <TreeLeaf<K> node={child}
                            level={level + 1}
                            key={child.key}
                            onChange={onChange}
                            value={value} />)}
                    </div>
                }
            </div>
        }
    </React.Fragment>
}

export default TreeLeaf