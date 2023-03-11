import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// @mui
import {
  Link, Stack, IconButton, Container,
  Typography,
  Card, Grid, Box, styled, CardContent, CardActions, CardMedia, Button, FormHelperText, Paper, Divider, InputAdornment, TextField, Checkbox, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getBillByid } from '../../store/BillSlice';
import useResponsive from '../../hooks/useResponsive';
import config from '../../config';

const IMAGE_BASE_URL = `${config.REACT_APP_API_URL}saved/bills/`

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
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


export default function BillStatus() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const billStore = useSelector((state) => state.bill);
  const { billid, name, deptname, retail, billdate, amount, tax, filename, approvals, billstatus } = billStore.bill;
  const mdUp = useResponsive('up', 'md');
  const [scroll, setScroll] = useState('paper');
  const [datevalue, setDateValue] = useState();

  const [open, setOpen] = useState(false);
  const [commentOpen, setCommentsOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getBillByid(billStore.billid))
  }, [])

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };
  return (

    <>

      <StyledRoot>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Bill Status
            </Typography>

          </Stack>
          <Card>
            <Grid container spacing={2} sx={{ p: 1 }}>
              <Grid item xs={12} md={6}>
                <Item>
                  <Paper>
                    <Card sx={{ maxWidth: 345 }}>

                      <CardContent>
                        {/* <Typography gutterBottom variant="body1" component="div">
                          Bill Status : <Typography gutterBottom variant="subtitle1" component="span">Review</Typography>
                        </Typography> */}
                        <Typography gutterBottom variant="body1" component="div">
                          Bill Name : <Typography gutterBottom variant="subtitle1" component="span">{name}</Typography>
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                          Department : <Typography gutterBottom variant="subtitle1" component="span">{deptname}</Typography>
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                          Retailer : <Typography gutterBottom variant="subtitle1" component="span">{retail}</Typography>
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                          Date of Purchase : <Typography gutterBottom variant="subtitle1" component="span">{billdate}</Typography>
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                          Amount : <Typography gutterBottom variant="subtitle1" component="span">{(amount)?.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'CAD',
                          })}</Typography>
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                          Tax : <Typography gutterBottom variant="subtitle1" component="span">{(tax)?.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'CAD',
                          })}</Typography>
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                          Total Amount : <Typography gutterBottom variant="subtitle1" component="span">{(tax + amount).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'CAD',
                          })}</Typography>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Paper>

                </Item>
              </Grid>

              {/* {mdUp && (<Divider orientation="vertical" flexItem />)} */}

              <Grid item xs={12} md={5}>
                <Stack >
                  <Card sx={{ maxWidth: 345, maxHeight: 300, m: 2 }}>
                    <CardMedia
                      component="img"
                      image={IMAGE_BASE_URL + filename}
                      alt="Bill"
                    />
                  </Card>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Bill Updates
                </Typography>
                {approvals?.map((approval) => {
                  function statusColorPick(val) {
                    if (val === 'Pending') {
                      return '#ffe0cc'
                    }
                    if (val === 'Review') {
                      return '#cceeff'
                    }
                    if (val === 'Approved') {
                      return '#ddffcc'
                    }
                    if (val === 'Reject') {
                      return '#ffc2b3'
                    }
                    return '#ddffcc'
                  }

                  const statusColor = statusColorPick(approval.status)
                  console.log(approval)
                  return (<Card key={approval.approvalid} sx={{ minWidth: 275, bgcolor:statusColor, mb:1 }}>
                    <CardContent>
                      <Typography sx={{ mb: 1 }} variant="h5" component="div">
                        Status:  {approval.status}
                      </Typography>
                      <Typography sx={{ mb: 1 }} color="text.secondary">
                        Updated By: {approval.approved_by}
                      </Typography>
                      <Typography sx={{ mb: 1 }} color="text.secondary">
                        Updated On: {moment(approval.approved_on).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                      </Typography>
                      {approval.comments && <Typography variant="body2">
                        Comments: {approval.comments}
                      </Typography>}
                    </CardContent>
                  </Card>)
                })}

              </Grid>

              <Grid item xs={12} >
                <Item>

                  <Stack direction={mdUp ? "row" : "column"} alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                    <Button variant="contained" size="large" onClick={handleClickOpen} component="label" sx={{ maxWidth: 150, mt: 2 }}>
                      View Bill
                    </Button>

                  </Stack>
                </Item>
              </Grid>
            </Grid>
          </Card>
        </Container>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEscapeKeyDown
        >
          <DialogTitle id="alert-dialog-title">
            {"Bill Picture"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Card sx={{ m: 2 }}>
                <CardMedia
                  component="img"
                  image={IMAGE_BASE_URL + filename}
                  alt="Bill"
                />
              </Card>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>



      </StyledRoot>
    </>
  );
}
