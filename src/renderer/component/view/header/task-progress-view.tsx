import React, { CSSProperties, useCallback, useEffect, useMemo } from "react"
import { Consumer } from "../../../../common/types"
import { TaskState } from "../../../store/data/state"

type TaskProgressViewProps = {
    task: TaskState,
    taskCount: number,
    changeTask: Consumer<number>
}

const TaskProgressView = ({
    task,
    taskCount,
    changeTask
}: TaskProgressViewProps) => {

    const barFrontCss = useMemo<CSSProperties>(() => {

        console.log('progressing', task.currentProgress)

        return {
            width: `${(1 - task.currentProgress) * 100}%`
        }

    }, [task.currentProgress])

    const hasMoreTasks = taskCount > 1

    const nextTask = useCallback(() => changeTask(1), [changeTask])
    const prevTask = useCallback(() => changeTask(-1), [changeTask])

    const progressValue = (task.currentProgress * 100).toFixed(2)

    return <div className="task-carousel__current">
        <div className="task-carousel__progress-bar-back" />
        <div className="task-carousel__progress-bar-front"
            style={barFrontCss} />
        <div className="task-carousel__description">
            {
                hasMoreTasks && <span className="task-carousel__description-button"
                    onClick={prevTask}>←</span>
            }
            <span className="task-carousel__description-text">
                {task.description}: {progressValue}% completed. {hasMoreTasks ? `${taskCount - 1} more task${taskCount > 2 ? 's' : ''} in progress` : null}
            </span>
            {
                hasMoreTasks && <span className="task-carousel__description-button"
                    onClick={nextTask}>→</span>
            }
        </div>
    </div>
}

export default TaskProgressView