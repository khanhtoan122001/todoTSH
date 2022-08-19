import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Input(props) {
  const {onChange, onAdd, task} = props;
  const handleChange = (e) => {
    onChange(e);
  }
  const handleAdd = () => {
    onAdd();
  }
  return (
    <div className='input'>
      <TextField label="Task" value={task} variant="outlined" onChange={handleChange} sx={{mr: '10px'}} type="search" />
      <Button variant="contained" onClick={handleAdd} sx={{width: '50px', height: '40px', mt:'8px'}}>Add</Button>
    </div>
  )
}

export default Input