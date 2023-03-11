import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { utilStore, userStore } from '../../../store';

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const userLoginValidation = Yup.object({
  email: Yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')

});

function LoginForm() {
  const navigate = useNavigate();
  const userData = userStore;

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log(userStore.userLoginSuccess)
    if (userStore.userLoginSuccess) {
      navigate('/dashboard', { replace: true });
    }
  }, [userStore.userLoginSuccess]);

  const formik = useFormik({
    initialValues: userData.userLoginInitialValues,
    validationSchema: userLoginValidation,
    onSubmit: (values) => {
      userStore.UserLogin(values, formik.setSubmitting)
    },
  });

  return (
    <>
      <Stack spacing={3}>
        <form onSubmit={formik.handleSubmit}>

          <Stack spacing={3}>
            <TextField
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email} />

            <TextField
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type={showPassword ? 'text' : 'password'}
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

          <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={formik.isSubmitting} loading={formik.isSubmitting}>
            Login
          </LoadingButton>

        </form>
      </Stack >
    </>
  );
}


export default observer(LoginForm);