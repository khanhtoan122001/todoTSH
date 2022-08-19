import React from 'react'
import { Card, CardHeader } from '@mui/material'

function TaskCard(props) {
  const {type, eidting, deleting, switching, jobs, handleEdit, handleDelete, handleSwitch, task, checked} = props;
  return (
    <div>
      <Card>
        <CardHeader/>
      </Card>
    </div>
  )
}

export default TaskCard