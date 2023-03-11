import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import {
  Link, Grid, Stack, IconButton, InputAdornment, TextField, Checkbox, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../components/iconify';
import { getDepartment } from '../../store/departmentSlice'
import { postUser } from '../../store/userSlice'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ProfileUpdateForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deptList = useSelector((state) => state.dept);
  const [loaddept, setloaddept] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setPersonName] = useState('');
  const [email, setEmail] = useState('');
  // const [depts, setDepartment] = useState([]);
  const [deptName, setDepartmentName] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [requestStatus, addRequestStatus] = useState(true);
  const [errMsg, setErrMsg] = useState(false);
  const onPersonChanged = (e) => setPersonName(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)


  const onDepartmentChanged = (e) => {
    const { target: { value }, } = e;
    setDepartmentName(value)
  }

  const onPasswordChanged = (e) => setPassword(e.target.value)
  const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value)

  const canSave =
    [name, email, deptName, password, confirmPassword, requestStatus].every(Boolean) && addRequestStatus


  const handleClick = () => {
    console.log({ name, email, deptName, password, confirmPassword })
    if (confirmPassword !== password) {
      setErrMsg(!errMsg)
      return errMsg
    }

    const department = [];
    for (let i = 0; i < deptName.length; i++) {
      for (let j = 0; j < deptList.data.length; j++) {
        const element = deptList.data[j];
        if (element.deptid === deptName[i]) {
          department.push(element);
        }
      }
    }
    setErrMsg(false)
    const userPostData = {
      'usertype': 'employee',
      'email': email,
      'name': name,
      'mobile': '111',
      'password': password,
      'depts': [
        ...department
      ],
      'status': true
    }
    console.log(userPostData)
    dispatch(
      postUser(userPostData)
    ).then(() => {
      if (deptList.status) {
        navigate('/login', { replace: true });
      }
    })
    // navigate('/login', { replace: true });
    return errMsg

  };

  useEffect(() => {
    dispatch(getDepartment())
    setloaddept(false)
  }, [loaddept])


  return (
    <>
      <Grid container xs={6} md={8}>
        <Stack spacing={3}>
          {deptList.data.length}
          <TextField name="name" value={name} onChange={onPersonChanged} label="Full Name" required />

          <TextField name="email" value={email} onChange={onEmailChanged} label="Email address" required />

          <FormControl>
            <InputLabel id="demo-multiple-checkbox-label">Department</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={deptName}
              onChange={onDepartmentChanged}
              input={<OutlinedInput label="Department" />}
              // renderValue={(selected) => selected.join(', ')}
              renderValue={(selected) => {
                const titles = [];
                for (let i = 0; i < selected.length; i++) {
                  for (let j = 0; j < deptList.data.length; j++) {
                    const element = deptList.data[j];
                    if (element.deptid === selected[i]) {
                      titles.push(element.name);
                    }
                  }
                }
                return titles.join(", ");
              }}
              MenuProps={MenuProps}
              required
            >
              {deptList.data.map((dept) => (
                <MenuItem key={dept.deptid} value={dept.deptid} >
                  <Checkbox checked={deptName.indexOf(dept.deptid) > -1} />
                  <ListItemText primary={dept.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Stack>

        <LoadingButton disabled={!canSave} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Register
        </LoadingButton>
      </Grid>
    </>
  );
}
