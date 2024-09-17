import React, { Component, useEffect, useState } from 'react'

export const ProfileStatusWithHooks = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    return (
      <div>
        {
            !editMode &&
            <div>
                <span onDoubleClick={() => setEditMode((prev) => !prev)}>{status || "------"}</span>
            </div>
        }
        {
            editMode && 
            <div>
                <input onChange={(e) => setStatus(e.currentTarget.value)} autoFocus onBlur={() => {
                    setEditMode((prev) => !prev);
                    props.updateStatus(status);
                }
                } type="text" value={status} />
            </div>
        }
      </div>
    )
}
