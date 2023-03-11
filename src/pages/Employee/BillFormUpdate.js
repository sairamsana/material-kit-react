import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Link, Stack, IconButton, Container,
  Typography,
  Card, Grid, styled, CardMedia, Button, FormHelperText, Paper, Divider, InputAdornment, TextField, Checkbox, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import useResponsive from '../../hooks/useResponsive';


const names = [
  'IT',
  'Home Depo',
  'IKEA'
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));


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


export default function BillFormUpdate() {
  const navigate = useNavigate();

  const mdUp = useResponsive('up', 'md');
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState('');
  const [retail, setRetail] = useState('');
  const [amount, setAmount] = useState('');
  const [tax, setTax] = useState('');
  const [setImage, setFile] = useState('');

  const [datevalue, setDateValue] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const [personName, setPersonName] = useState([]);


  const handleGetImageChange = (event) => {
    console.log(event.target.files[0]);
    setFile(URL.createObjectURL(event.target.files[0]))
  };

  
  const handleRetailerChange = (event) => {
    console.log(event);
    setRetail(event.target.value)
  };


  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }
  const handleTaxChange = (event) => {
    setTax(event.target.value)
  }

  const handleSetImageChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDateChange = (newValue) => {
    console.log(newValue);
    setDateValue(newValue)
  };

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };
  return (
    <>

      <StyledRoot>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Update Bill
            </Typography>

          </Stack>
          <Card>
            <Grid container spacing={2} sx={{ p: 1 }}>
              <Grid item xs={12} md={6}>
                <Item>
                  <Stack spacing={3}>
                  <TextField name="name" label="Bill Name" />
                    {/* <FormControl>
                      <InputLabel id="demo-multiple-checkbox-label">Department</InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Department" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Department</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={personName}
                        label="Department"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>IT</MenuItem>
                        <MenuItem value={20}>AP</MenuItem>
                        <MenuItem value={30}>Canada Tyre</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Retailer</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={retail}
                        label="Retailer"
                        onChange={handleRetailerChange}
                      >
                        <MenuItem value={10}>Home Depo</MenuItem>
                        <MenuItem value={20}>Ikea</MenuItem>
                        <MenuItem value={30}>Canada Tyre</MenuItem>
                      </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        label="Date of Purchase"
                        inputFormat="MM/DD/YYYY"
                        value={datevalue}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        value={amount}
                        onChange={handleAmountChange}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                      />
                      <FormHelperText id="component-helper-text">
                        Please enter total amount excluding tax
                      </FormHelperText>
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">Tax</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        value={tax}
                        onChange={handleTaxChange}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Tax"
                      />
                    </FormControl>

                  </Stack>


                </Item>
              </Grid>

              {mdUp && (<Divider orientation="vertical" flexItem />)}

              <Grid item xs={12} md={5}>
                <Stack sx={{ p: 1 }}>

                  <Button variant="contained" component="label" sx={{ maxWidth: 150, m: 2 }}>
                    Upload Bill
                    <input hidden accept="image/*" onChange={handleGetImageChange} type="file" />
                  </Button>

                  {setImage && <Card sx={{ maxWidth: 345, m: 2 }}>
                    <CardMedia
                      component="img"
                      image={setImage}
                      alt="Bill"
                    />
                  </Card>}
                </Stack>

              </Grid>
              <Grid item xs={12} md={6}>
                <Item>
                  {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                    <Checkbox name="remember" label="Remember me" />
                    <Link variant="subtitle2" underline="hover">
                      Forgot password?
                    </Link>
                  </Stack> */}

                  <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                    Submit
                  </LoadingButton>
                </Item>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </StyledRoot>
    </>
  );
}
