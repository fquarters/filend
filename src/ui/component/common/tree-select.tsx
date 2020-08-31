import React, { useCallback, useMemo } from "react"
import { union } from "../../../common/collections"
import { BiConsumer } from "../../../common/types"
import { Dropdown } from "./dropdown"
import SelectInput from "./select-input"
import TreeLeaf, { TreeNode } from "./tree-leaf"

type TreeSelectProps<K extends React.Key> = {
    tree: TreeNode<K>[],
    value: K[],
    onChange: BiConsumer<TreeNode<K>, boolean>
}

const TreeSelect = <K extends React.Key>({
    tree,
    onChange,
    value
}: TreeSelectProps<K>) => {

    const tags = useMemo(() => tree
        .flatMap(node => flatten(node))
        .filter(node => value.indexOf(node.key) > -1)
        .map(node => ({
            label: node.label,
            value: node
        })),
        [value, tree])

    const onDelete = useCallback((node: TreeNode<K>) => onChange(node, false), [onChange])

    const input = useMemo(() => <SelectInput tags={tags}
        onDelete={onDelete} />,
        [tags, onChange])

    return <Dropdown input={input}>
        {tree.map((node) => <TreeLeaf node={node}
            level={0}
            key={node.key}
            value={value}
            onChange={onChange} />)}
    </Dropdown>
}

const flatten = <K extends React.Key>(node: TreeNode<K>): TreeNode<K>[] => {

    const children = node.children ? node.children.flatMap((child) => flatten(child)) : []

    return [node].concat(children)
}

const getAllKeys = <K extends React.Key>(node: TreeNode<K>): K[] => {

    const childrenKeys = node.children ? node.children.flatMap((child) => getAllKeys(child)) : []

    return union([node.key], childrenKeys)
}

const getChildrenKeys = <K extends React.Key>(node: TreeNode<K>): K[] => node.children ? node.children.flatMap((child) => getAllKeys(child)) : []

export default TreeSelect

export {
    getAllKeys,
    getChildrenKeys
}
