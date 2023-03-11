import { Box, Grid, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import * as Yup from "yup";
import { InputField, InputSelectField } from '../../form';
import { LoadingButton, Modal } from '../commons';
import { dataStore } from '../../store';

const roles = [
    {
        id: "admin", name: "Admin"
    }
]
const AccountAddSchema = Yup.object().shape({
    id: Yup.string(),
    role: Yup.string().required(),
    email: Yup.string()
        .email()
        .required(),
    name: Yup.string()
        .max(1000, "Too Long!")
        .required(),
    password: Yup.string()
    // .when("id", {
    //     is: (id) => !id,
    //     then: Yup.string().required(),
    //     otherwise: Yup.string().nullable(),
    // })
});

function CreateUser() {
    const { userAdding, userValidationErrors, userError } = dataStore

    return (
        <Modal
            open={userAdding}
            handleClose={() => {
                dataStore.toggleUserAdd();
            }}
            title={"Add User"}
        >
            <Box marginTop={3}>
                <Formik
                    initialValues={dataStore.user}
                    initialErrors={userValidationErrors || {}}
                    onSubmit={(values, { setSubmitting, setErrors }) => {
                        dataStore.SubmitUser(
                            values,
                            setSubmitting,
                            setErrors
                        );
                    }}
                    validationSchema={AccountAddSchema}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        name={"role"}
                                        label="Role"
                                        placeholder={"select Role"}
                                        component={InputSelectField}
                                        variant="outlined"
                                        itemKeys={{ title: "name" }}
                                        fullWidth
                                        options={roles}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="email"
                                        label="Email"
                                        type="email"
                                        placeholder="Enter email"
                                        component={InputField}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="name"
                                        label="Name"
                                        placeholder="enter name"
                                        component={InputField}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                {!dataStore.user.id ? <Grid item xs={12}>
                                    <Field
                                        name="password"
                                        label="Pasword"
                                        placeholder="enter user password"
                                        component={InputField}
                                        variant="outlined"
                                        fullWidth
                                        type="password"
                                    />
                                </Grid> : null}
                                <Grid item xs={12}>
                                    <Field
                                        name="file"
                                        label="File"
                                        component={InputField}
                                        fullWidth
                                        type="file"
                                        onValueChange={(e) => {
                                            if (!e.target.files) {
                                                setFieldValue("image", null);
                                                return;
                                            }
                                            const file = e.target.files[0];
                                            setFieldValue("image", URL.createObjectURL(file));
                                        }}
                                    />
                                    {values.image && (
                                        <Box mt={2} display="flex" alignItems={"center"} flexDirection="column">
                                            <div>Image Preview:</div>
                                            <img src={values.image} alt={"bill"} height="100px" />
                                        </Box>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Box textAlign="center">
                                        <Typography color="error">{userError}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <LoadingButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                    >
                                        {"Create"}
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    )
}

export default observer(CreateUser)