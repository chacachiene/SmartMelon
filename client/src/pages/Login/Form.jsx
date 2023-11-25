import { useState } from "react"
import { Box, Button, TextField, Typography, useTheme, useMediaQuery } from "@mui/material"

import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLogin } from "state"
import { Formik } from "formik"
import * as yup from "yup"
import Dropzone from "react-dropzone"
import FlexBetween from "component/FlexBetween"
import {Alert} from "component/Alert/index"
import Swal from "sweetalert2"
const registerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  picture: yup.string().required("Profile Picture is required"),
})

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 8 characters"),
})

const initialRegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  picture: "",
}
const initialLoginValues = {
  username: "",
  password: "",
}

const Form = () => {
  const [pageType, setPageType] = useState("login")
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isPC = useMediaQuery("(min-width:1024px)")
  const isLogin = pageType === "login"
  const isRegister = pageType === "register"

  const register = async (values, onSubmitProps) => {
    const formData = new FormData()
    for (let v in values) {
      formData.append(v, values[v])
    }
    formData.append("picture", values.picture.name)
    console.log(formData)
    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      body: formData,
    })
    // const data = await res.json()
    onSubmitProps.resetForm()
    if (res.status === 400) {
        Alert("err")
    }
    else if(res.status === 201){
      Alert("success")
      setPageType("login")
    }
  }

  const login = async (values, onSubmitProps) => {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    const data = await res.json()
    onSubmitProps.resetForm()
    // get status of data
    console.log(res.status)
    if (res.status === 400) {
      // if(data.message === "User does not exist")
        Alert("err")
      // else if(data.message === "Incorrect Password")
      //   Alert("err")
    }
    else if (res.status === 200) {
      if (data){
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        }),
      )
      Alert(data.user)
      // wait 3 seconds before redirecting to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
      }
    } 

  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps)
    if (isRegister) await register(values, onSubmitProps)
  }

  return (
    <Formik
      initialValues={isLogin ? initialLoginValues : initialRegisterValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        setFieldValue,
        isSubmitting,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="1rem"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isPC ? "span 2" : "span 4",
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />

                <Box
                  gridColumn="span 4"
                  border={`1px dashed ${palette.secondary.main}`}
                  alignItems="center"
                  borderRadius="4rem"
                >
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0])
                    }}
                    acceptFiles=".jpg, .png, .jpeg"
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <Typography variant="h6" color="primary">
                            Drag and drop or click to select a picture
                          </Typography>
                        ) : (
                          <FlexBetween>
                            <Typography variant="h6" color="primary">
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
              label="Username"
              variant="outlined"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
            />
            {isRegister && (
              <TextField
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched.confirmPassword && errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 2" }}
              />
            )}
          </Box>

          <Box>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                sx={{ width: "100%", mt: "1rem", mb: "0.5rem" }}
            >
                {isLogin ? "Login" : "Register"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login")
                resetForm()
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Register here"
                : "Already have an account? Login here"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form
