import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite'; // Or "mobx-react".
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton } from '@mui/material';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Confirm, MUITable } from '../components/commons';
import { dataStore } from '../store';
// import DataTable from '../components/DataTable';
import { CreateUser } from "../components/Users"

const UsersPage = observer(() => {
  const [deleteIndex, setDeleteIndex] = React.useState(-1);

  useEffect(() => {
    dataStore.getUserList();
    // return () => {
    //   dataStore.resetUserList();
    // };
  }, []);

  const columns = [
    {
      name: 'name',
      label: 'Names',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'role',
      label: 'Role',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, { rowIndex }) => (
          <>
            <Box display="flex" alignItems="center">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  dataStore.editUser(rowIndex);
                }}
              >
                <EditIcon />
              </IconButton>
              <Box color="error.main">
                <IconButton
                  aria-label="delete"
                  color="inherit"
                  onClick={() => {
                    setDeleteIndex(rowIndex);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            </Box>
          </>
        )
      },
    },

  ];
  return (
    <div>
      <MUITable
        loading={dataStore.usersLoading}
        error={dataStore.usersError}
        title={'Users List'}
        data={dataStore.users}
        columns={columns}
        filters={dataStore.userFilters}
        getData={(filters) => { dataStore.getUserList(filters) }}
        options={{
          serverSide: true,
          pagination:true,
          filter:true,
          customToolbar: () => (
            <IconButton
              aria-label="create new user"
              // className={classes.margin}
              onClick={() => {
                dataStore.toggleUserAdd()
              }}
              disabled={dataStore.userLoading}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          ),
        }}
      />
      <CreateUser />
      <Confirm
        open={deleteIndex >= 0}
        title={"Are you sure?"}
        message={"Remove account and account associated data"}
        onConfirm={() => {
          dataStore.deleteUser(deleteIndex);
          setDeleteIndex(-1);
        }}
        handleClose={() => {
          setDeleteIndex(-1);
        }}
      />
    </div>
  );
});

export default UsersPage;
