import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CardContent, CardHeader, List, ListItem, IconButton, ListItemButton, ListItemIcon, Checkbox, ListItemText, Stack } from '@mui/material';
import { useEffect } from 'react';
import useLocalStorage from './hook/useLocalStorage';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import CheckIcon from '@mui/icons-material/Check';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Input from './components/input';

function App() {
  const [task, setTask] = React.useState('');
  const [checked, setChecked] = React.useState([]);
  const [editing, setEditing] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [switching, setSwitching] = React.useState(false);
  const [jobs, setJobs] = useLocalStorage('jobs',[]);


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleEdit = () => {
    setEditing(true);
  }
  const handleDelete = () => {
    setDeleting(true);
  }
  const handleDone = () => {
    if (deleting)
    {
      let temp = jobs;
      for(let i=0;i<checked.length;i++)
      {
        temp.splice(checked[i], 1);
      }
      setJobs(temp);
    }
    setEditing(false);
    setDeleting(false);
    setChecked([]);
  }
  const handleChange = (e) => {
    setTask(e.target.value);
  }
  const handleAdd = () => {
    let temp = [task, false];
    setJobs((prevJobs)=>[...prevJobs, temp]);
    setTask('');
  }
  const handleChangeJob = (e, index) => {
    let newJobs = jobs;
    newJobs[index][0] = e.target.value;
    setJobs(newJobs);
  }
  const handleSwitch = () => {
    setSwitching(true);
  }
  const handleSwitched = () => {
    setSwitching(false);
    let temp = jobs;
    for(let i=0;i<checked.length;i++)
    {
      temp[checked[i]][1] = !temp[checked[i]][1]; 
    }
    setChecked([]);
    setJobs(temp);
  }

  return (
    <div className='home'>
      <Input task={task} onChange={handleChange} onAdd={handleAdd}/>
      <div className='main-task'>
        <Card className='task_card'>
          <CardHeader
            title="Task"
          />
          <CardContent>
            {(editing)?
              <List>
                {jobs.map((job, index)=>{
                  if (!job[1]&&job[0].toLowerCase().search(task.toLowerCase())!==-1)
                    return(
                      <ListItem disablePadding key={index}>
                        <TextField defaultValue={job[0]} onChange={e=>handleChangeJob(e, index)} sx={{mt: '5px'}}/>
                      </ListItem>
                    )
                })}
              </List>
              :((deleting||switching)?
                <List>
                  {jobs.map((job, index)=>{
                    const labelId = `checkbox-list-label-${job}`;
                    if (!job[1]&&job[0].toLowerCase().search(task.toLowerCase())!==-1)
                      return(
                        <ListItem disablePadding key={index}>
                          <ListItemButton onClick={handleToggle(index)}>
                            <ListItemIcon>
                              <Checkbox 
                                edge="start"
                                checked={checked.indexOf(index) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText primary={job}/>
                          </ListItemButton>
                        </ListItem>
                      )
                  })}
                </List>
              :
              <List>
                {jobs.map((job, index)=>{
                  if (!job[1]&&job[0].toLowerCase().search(task.toLowerCase())!==-1)
                    return(
                      <ListItem disablePadding key={index}>
                        <ListItemButton>
                          <ListItemIcon>
                            <FiberManualRecordIcon fontSize="inherit"/>
                          </ListItemIcon>
                          <ListItemText primary={job}/>
                        </ListItemButton>
                      </ListItem>
                    )
                })}
              </List>)
            }
          </CardContent>
        </Card>
        <div className='button'>
          <IconButton disabled={!switching} color="primary" onClick={handleSwitched}>
            <CheckIcon/>
          </IconButton>
          <IconButton disabled={deleting||editing} onClick={handleSwitch}>
            <MultipleStopIcon/>
          </IconButton>
        </div>
        <Card className='task_card'>
          <CardHeader
            title="Done"
          />
          <CardContent>
            {(editing)?
              <List>
                {jobs.map((job, index)=>{
                  if (job[1]&&job[0].toLowerCase().search(task.toLowerCase())!==-1)
                    return(
                      <ListItem disablePadding key={index}>
                        <TextField defaultValue={job[0]} onChange={e=>handleChangeJob(e, index)} sx={{mt: '5px'}}/>
                      </ListItem>
                    )
                })}
              </List>
            :(deleting||switching)?
              <List>
                {jobs.map((job, index)=>{
                  const labelId = `checkbox-list-label-${job}`;
                  if (job[1]&&job[0].toLowerCase().search(task.toLowerCase())!==-1)
                    return(
                      <ListItem disablePadding key={index}>
                        <ListItemButton onClick={handleToggle(index)}>
                          <ListItemIcon>
                            <Checkbox 
                              edge="start"
                              checked={checked.indexOf(index) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText primary={job}/>
                        </ListItemButton>
                      </ListItem>
                    )
                })}
              </List>
              :
              <List>
                {jobs.map((job, index)=>{
                  if (job[1]&&job[0].toLowerCase().search(task.toLowerCase())!==-1)
                    return(
                      <ListItem disablePadding key={index}>
                        <ListItemButton>
                          <ListItemIcon>
                            <FiberManualRecordIcon fontSize="inherit"/>
                          </ListItemIcon>
                          <ListItemText primary={job}/>
                        </ListItemButton>
                      </ListItem>
                    )
                })}
              </List>
              }
          </CardContent>
        </Card>
      </div >
      <div className='stack'>
        {(editing||deleting)?
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={handleDone}>Done</Button>
          </Stack>
        :
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleEdit} disabled={switching}>Edit</Button>
            <Button variant="contained" onClick={handleDelete} disabled={switching} color="error">Delete</Button>
          </Stack>
        }
      </div>
    </div>
  );
}

export default App;
