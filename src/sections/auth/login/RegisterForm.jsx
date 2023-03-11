import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// @mui
import {
  Link, Stack, IconButton, InputAdornment, TextField, Checkbox, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Grid
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { utilStore, userStore } from '../../../store';
// components
import Iconify from '../../../components/iconify';



const userValidation = Yup.object({
  userid: Yup.string(),
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  mobile: Yup.string(),
  email: Yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  passwordConfirmation: Yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')

});


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

function Register() {

  const userData = userStore;
  const formik = useFormik({
    initialValues: userData.userInitialValues,
    validationSchema: userValidation,
    onSubmit: (values) => {
      userStore.SubmitUser(values, formik.setSubmitting)
    },
  });

  return (
    <>

      <Stack spacing={3}>
        {userStore.userSuccess &&
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {userStore.userSuccess}— <strong>Please Login..!</strong>
          </Alert>
        }

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              id="firstname"
              name="firstname"
              label="First Name"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
            />

            <TextField
              id="lastname"
              name="lastname"
              label="Last Name"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
            />

            <TextField
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}

            // type={showPassword ? 'text' : 'password'}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
            //         <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
            //       </IconButton>
            //     </InputAdornment>
            //   ),
            // }}
            />

            <TextField
              id="passwordConfirmation"
              name="passwordConfirmation"
              label="Confirm Password"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
              helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}

            // type={showPassword ? 'text' : 'password'}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
            //         <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
            //       </IconButton>
            //     </InputAdornment>
            //   ),
            // }}
            />



          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <Checkbox name="remember" label="Remember me" />
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={formik.isSubmitting} loading={formik.isSubmitting} >
            Register
          </LoadingButton>
        </form>
      </Stack >
    </>
  );
}


export default observer(Register);