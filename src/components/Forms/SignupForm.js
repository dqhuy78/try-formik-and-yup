import React, { Component } from 'react'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'

import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'

class SignupForm extends Component {

    render() {
        const {
            errors,  // Error bag
            touched, // Check if the form field have ever been active
            isSubmitting // Check if the form submiting has finish (boolean)
        } = this.props

        return (
            <Grid container justify='center' alignContent='center'>
                <Grid item xs={6} md={4}>
                    <Paper elevation={4} style={{ padding: '20px 15px', marginTop: '30px' }}>
                        <Typography variant="headline" gutterBottom>
                            Signup
                        </Typography>
                        <Form>
                            <FormControl fullWidth margin='normal' error={touched.username && !!errors.username}>
                                <InputLabel>Username</InputLabel>
                                <Field
                                    name='username'
                                    placeholder='example'
                                    render={({ field }) => (
                                        <Input fullWidth {...field} />
                                    )} />
                                {touched.username && errors.username && <FormHelperText>{errors.username}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth margin='normal' error={touched.email && !!errors.email}>
                                <InputLabel>Email</InputLabel>
                                <Field
                                    name='email'
                                    placeholder='example@gmail.com'
                                    render={({ field }) => (
                                        <Input fullWidth {...field} />
                                    )} />
                                {touched.email && errors.email && <FormHelperText>{errors.email}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth margin='normal' error={touched.password && !!errors.password}>
                                <InputLabel>Password</InputLabel>
                                <Field
                                    name='password'
                                    render={({ field }) => (
                                        <Input fullWidth type='password' {...field} />
                                    )} />
                                {touched.password && errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth margin='normal'>
                                <Select
                                    displayEmpty
                                    name='plan'
                                    value={this.props.values.plan}
                                    onChange={this.props.handleChange}
                                >
                                    <MenuItem value='basic'>Basic</MenuItem>
                                    <MenuItem value='advance'>Advance</MenuItem>
                                    <MenuItem value='enterprise'>Enterprise</MenuItem>
                                </Select>
                            </FormControl>
                            <Field
                                name='receiveLetter'
                                type='checkbox'
                                checked={this.props.values.receiveLetter}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox {...field} />
                                        }
                                        label='Receive new letter'
                                    />
                                )}
                            />
                            <FormControl fullWidth margin='normal'>
                                <Button
                                    variant='extendedFab'
                                    color='primary'
                                    type='submit'
                                    disabled={isSubmitting}
                                    onClick={this.props.handleSubmit}
                                >
                                    Signup
                                </Button>
                            </FormControl>
                        </Form>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {
            username: '',
            email: '',
            password: '',
            receiveLetter: true,
            plan: 'basic'
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        username: Yup.string()
            .required('Username is required')
            .min(5, 'Username must have min 5 characters')
            .max(10, 'Username have max 10 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must have min 8 characters')
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) { // Handle submit form
        setTimeout(() => {
            if (values.email === 'dqhuy78@gmail.com') {
                setErrors({ email: 'Email already taken' }) // Set error bag
            } else {
                resetForm() // Clear form data
            }
            setSubmitting(false) // Set isSubmitting to false
        }, 2000)
    }
})(SignupForm)


export default FormikForm
