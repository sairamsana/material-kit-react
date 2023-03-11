import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
// import { useDispatch, useSelector } from 'react-redux';

import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)

  // useEffect(()=>{
  //   if (user.isUserLoggedin) {
  //     navigate(user.usertype === 'accountant' ? '/accountant' : '/dashboard', { replace: true });
  //   }
  // },[user.isUserLoggedin])

  const handleClick = () => {
    console.log("sana",user)
    dispatch(
      getUserLogin({ email, password })
    )
    // .then(() => {
    //   console.log(user.isUserLoggedin)
    //   if (user.isUserLoggedin) {
    //     console.log(user.isUserLoggedin)
    //     navigate('/dashboard', { replace: true });
    //   }
    // })
    // navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" value={email} onChange={onEmailChanged} label="Email address" required />


        <TextField
          name="password"
          label="Password"
          value={password}
          required
          type={showPassword ? 'text' : 'password'}
          onChange={onPasswordChanged}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
