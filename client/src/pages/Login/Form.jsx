import React from 'react'
import { useState} from 'react'
import { Box, useMediaQuery, Button, TextField,Typography,useTheme } from '@mui/material';
import { EditOutlinedIcon } from '@mui/icons-material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from 'state';
import Dropzone from 'react-dropzone';
import FlexBetween from 'component/FlexBetween';
import { useNavigate } from 'react-router-dom';


const registerSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phone: yup.string().required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().required('Confirm password is required'),
    picture: yup.string().required('Picture is required'),
    });

const loginSchema = yup.object().shape({
    username: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    });

const initialValuesRegister = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    picture: '',
    };

const initialValuesLogin = {
    username: '',
    password: '',
    };

const Form = () => {
    const [pageType, setPageType] = useState('login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isPc = useMediaQuery('(min-width: 1000px)');
    const isLogin = pageType === 'login';
    const isRegister = pageType === 'register';
    
    const handleFormSubmit = async (values, onSubmitProps) => {
        if {isLogin} {
            
    }


    return (
        <Formik 
        onsubmit = {handleFormSubmit}
        initialValues = {isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema = {isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                resetForm,

            }) => (
                <form onSubmit={handleSubmit}>
                    <Box display='grid'
                        gap = '1rem'
                        gridTemplateColumns = 'repeat(4, minmax(0px, 1fr))'
                        sx= {{
                            '&>div': { gridColumn: isPc ?undefined : 'span 4' }

                     
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    name='firstName'
                                    label='First name'
                                    variant='standard'
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.firstName && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx ={{ gridColumn: isPc ? 'span 2' : undefined }}
                                />
                                <TextField
                                    name='lastName'
                                    label='Last name'
                                    variant='standard'
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.lastName && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx ={{ gridColumn: isPc ? 'span 2' : undefined }}
                                />
                                <TextField
                                    name='phone'
                                    label='Last name'
                                    variant='standard'
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.phone && Boolean(errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                    sx ={{ gridColumn: isPc ? 'span 2' : undefined }}
                                />
                                <TextField
                                    name='username'
                                    label='Last name'
                                    variant='standard'
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                    sx ={{ gridColumn: isPc ? 'span 2' : undefined }}
                                />
                                
                                <TextField
                                    name='email'
                                    label='Last name'
                                    variant='standard'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx ={{ gridColumn: isPc ? 'span 2' : undefined }}
                                />
                                <TextField
                                    name='password'
                                    label='Last name'
                                    variant='standard'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx ={{ gridColumn: isPc ? 'span 2' : undefined }}
                                />
                                <TextField
                                    name='confirmPassword'
                                    label='Last name'
                                    variant='standard'
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                    sx ={{ gridColumn: isPc ? 'span 2' : undefined }}
                                />

                                <Box 
                                    gridColumn= 'span 4'
                                    border= {`1px  solid ${theme.palette.neutral.medium}`}
                                    borderRadius = '1rem'
                                    p = '1rem'
                                >
                                    <Dropzone 
                                        acceptedFiled= '.jpg, .png, .jpeg'
                                        multiple = {false}
                                        onDrop = {(acceptedFiles) => {
                                            setFieldValue('picture', acceptedFiles[0]);
                                        }}
                                    >
                                        {({getRootProps, getInputProps}) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`1px dashed ${theme.palette.main}`}
                                                p='1rem'
                                                sx = {{
                                                    '&:hover': {
                                                        cursor: 'pointer'
                                                    }
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <FlexBetween>
                                                        <Typography
                                                            variant = 'body1'
                                                            color = {theme.palette.neutral.medium}
                                                        >
                                                            Drag and drop your image here
                                                        </Typography>
                                                        
                                                    </FlexBetween>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>
                                                            {values.picture.name}
                                                        </Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}    
                                            
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}
                                <TextField
                                    name='username'
                                    label='Last name'
                                    variant='standard'
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                    sx ={{ gridColumn: isPc ? 'span 2' : undefined }}
                                />
                                <TextField
                                    name='password'
                                    label='Password'
                                    type = 'password'
                                    variant='standard'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx ={{ gridColumn: isPc ? 'span 2' : undefined }}
                                />
                    </Box>

                    <Button
                        fullWidth
                        type='submit'
                        sx ={{
                            marginTop: '1rem'
                        }}
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </Button>

                    <Typography 
                        onclick = {() => {
                            setPageType(isLogin ? 'register' : 'login');
                            resetForm();
                        }} 
                        sx = {{}}
                    >
                        {isLogin ?  "Don't have an account? Sign up here"
                                : 'Already have an account? Login here'}
                    </Typography>

                </form>    
            )}
        </Formik>
  )
}

export default Form