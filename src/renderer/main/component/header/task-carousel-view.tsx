import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { indexOfElement, first } from "../../../../common/collections"
import Selectors from "../../store/data/selectors"
import TaskProgressView from "./task-progress-view"
import "./task-carousel-view.scss"

const TaskCarouselView = () => {

    const tasks = useSelector(Selectors.tasks)
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null)

    useEffect(() => {

        if (!currentTaskId && tasks.length) {

            console.log('setting task', tasks[tasks.length - 1])

            setCurrentTaskId(tasks[tasks.length - 1].id)
        }

        if (currentTaskId && !tasks.length) {

            console.log('clearing task', currentTaskId)

            setCurrentTaskId(null)
        }

    }, [tasks])

    const changeTask = useCallback((indexChange: number) => {

        setCurrentTaskId((current) => {

            const currentIndex = indexOfElement(tasks, (task) => task.id === current)
            const newIndex = currentIndex + indexChange
            const maxIndex = tasks.length - 1
            const clampedIndex = indexChange > 0
                ? newIndex > maxIndex
                    ? 0
                    : newIndex
                : newIndex < 0
                    ? maxIndex
                    : newIndex

            return tasks[clampedIndex].id
        })

    }, [tasks])

    const task = useMemo(() => first(tasks, (task) => task.id === currentTaskId),
        [currentTaskId, tasks])


    return <div className="task-carousel">
        {
            task && <TaskProgressView task={task}
                taskCount={tasks.length}
                changeTask={changeTask} />
        }
    </div>
}

export default TaskCarouselView