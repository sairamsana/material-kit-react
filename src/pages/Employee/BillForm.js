import { useEffect, useState } from 'react';
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
import moment from "moment";
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartment } from '../../store/departmentSlice'
import { postBill } from '../../store/BillSlice';
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


export default function BillForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const billStore = useSelector((state) => state.bill);
  const deptList = useSelector((state) => state.dept);
  const mdUp = useResponsive('up', 'md');
  const [name, setBillName] = useState('');
  const [loaddept, setloaddept] = useState(true);

  const [department, setDepartment] = useState('');
  const [retail, setRetail] = useState('');
  const [amount, setAmount] = useState('');
  const [tax, setTax] = useState('');
  const [setImage, setFile] = useState('');
  const [datevalue, setDateValue] = useState();

  useEffect(() => {
    dispatch(getDepartment())
    setloaddept(false)
  }, [loaddept])

  const onDepartmentChanged = (e) => setDepartment(e.target.value)
  const onBillChanged = (e) => setBillName(e.target.value)
  const onRetailerChanged = (e) => setRetail(e.target.value)
  const onAmountChanged = (e) => setAmount(e.target.value)
  const onTaxChanged = (e) => setTax(e.target.value)
  const onDateChanged = (e) => {
    setDateValue(dayjs(e))
  }

  const handleGetImageChange = (event) => {
    const myNewFile = new File(
      [event.target.files[0]],
      `${Date.now()}-${event.target.files[0].name}`,
      { type: event.target.files[0].type }
    );

    console.log(myNewFile.name)
    setFile(myNewFile)
  };

  const canSave =
    [name, department, retail, amount, tax, setImage, datevalue].every(Boolean)

  const handleClick = () => {
    console.log("bill ", user)
    const data = new FormData();
    data.append('name', name)
    data.append('deptname', department)
    data.append('retail', retail)
    data.append('amount', amount)
    data.append('tax', tax)
    data.append('setImage', setImage)
    data.append('billstatus', "Pending")
    data.append('billdate', moment(datevalue).format("YYYY-MM-DD"))
    data.append('userid', user.useruuid)

    dispatch(
      postBill(data)
    ).then(() => {
      // if (billStore.billPostStatus) {
        navigate('/dashboard/bill', { replace: true });
      // }
    })

    // navigate('/dashboard', { replace: true });
  };


  return (
    <>

      <StyledRoot>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              New Bill
            </Typography>

          </Stack>
          <Card>
            <Grid container spacing={2} sx={{ p: 1 }}>
              <Grid item xs={12} md={6}>
                <Item>
                  <Stack spacing={3}>
                    <TextField name="name" value={name} onChange={onBillChanged} label="Bill Name" required />

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Department</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={department}
                        label="Department"
                        onChange={onDepartmentChanged}
                      >
                        {deptList.data.map((dept) => (
                          <MenuItem key={dept.deptid} value={dept.name} >
                            {dept.name}
                          </MenuItem>
                        ))}

                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Retailer</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={retail}
                        label="Retailer"
                        onChange={onRetailerChanged}
                      >
                        <MenuItem value={'Home Depo'}>Home Depo</MenuItem>
                        <MenuItem value={'Ikea'}>Ikea</MenuItem>
                        <MenuItem value={'Canada Tyre'}>Canada Tyre</MenuItem>
                      </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        label="Date of Purchase"
                        inputFormat="YYYY-MM-DD"
                        value={datevalue}
                        onChange={onDateChanged}
                        renderInput={(params) => <TextField {...params} />}
                        required
                      />
                    </LocalizationProvider>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        value={amount}
                        onChange={onAmountChanged}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                        type="number"
                        required
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
                        onChange={onTaxChanged}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Tax"
                        type="number"
                        required
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
                      image={URL.createObjectURL(setImage)}
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

                  <LoadingButton  disabled={!canSave} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
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
