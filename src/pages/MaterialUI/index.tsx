import { useState } from 'react';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { red } from '@mui/material/colors';


export default () => {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        bornDate: Yup.date().min(new Date(1900, 0, 1)).max(new Date()).required(),
        height: Yup.number().positive().required(),
        gender: Yup.string().required(),
        tecnologies: Yup.object().shape({
            stack: Yup.array().min(1).required(),
        }),
        color: Yup.string().required(),
        password: Yup.string().required().min(6).max(20),
        passwordConfirm: Yup.string().min(6).max(20).required().test(
            'password-equals',
            'Password and password confirmation are different',
            (value, context) => value === context.parent.password,
        ),
        // passwordConfirm: Yup.string().oneOf([Yup.ref('password')]),
    });

    const [selectedValue, setSelectedValue] = useState('a');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <CssBaseline />

            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    bornDate: null,
                    height: '',
                    gender: '',
                    tecnologies: {
                        stack: [],
                    },
                    color: '',
                    password: '',
                    passwordConfirm: '',
                }}
                onSubmit={async (form) => {
                    console.log(form);
                }}
                validationSchema={schema}
            >
                <Form className='flex flex-col gap-2 w-80 mt-16 mx-auto p-5 border-solid border '>
                    <Box>
                        <Field name='name' className='w-full'>
                            {({ field }: FieldProps) => (
                                <TextField label='Nome' variant='standard' {...field} sx={{ width: '100%' }} />
                            )}
                        </Field>

                        <Typography sx={{ color: red.A200 }} variant="body2">
                            <ErrorMessage name='name' />
                        </Typography>
                    </Box>

                    <Box>
                        <Field name='email'>
                            {({ field }: FieldProps) => (
                                <TextField label='E-mail' type='email' variant='standard' {...field} sx={{ width: '100%' }} />
                            )}
                        </Field>

                        <Typography sx={{ color: red.A200 }} variant="body2">
                            <ErrorMessage name='email' />
                        </Typography>
                    </Box>

                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Field name='bornDate'>
                                {({ field, form, meta }: FieldProps) => (
                                    <DatePicker
                                        {...field}
                                        label='Nascimento'
                                        inputFormat='DD/MM/YYYY'
                                        onChange={date => form.setFieldValue(field.name, date, true)}
                                        renderInput={(params) => <TextField {...params} variant='standard' size='small' />}
                                        className='w-full'
                                    />
                                )}
                            </Field>
                        </LocalizationProvider>

                        <Typography sx={{ color: red.A200 }} variant="body2">
                            <ErrorMessage name='bornDate' />
                        </Typography>
                    </Box>

                    <Box>
                        <Field name='height'>
                            {({ field }: FieldProps) => (
                                <TextField label='Altura' type='number' variant='standard' {...field} sx={{ width: '100%' }} />
                            )}
                        </Field>

                        <Typography sx={{ color: red.A200 }} variant="body2">
                            <ErrorMessage name='height' />
                        </Typography>
                    </Box>

                    <Box>
                        <Field name='gender'>
                            {({ field }: FieldProps) => (
                                <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
                                    {[{ value: 'man', label: 'Masculino' }, { value: 'woman', label: 'Feminino' }]
                                        .map(({ value, label }) => (
                                            <FormControlLabel
                                                value={value}
                                                label={label}
                                                control={<Radio size='small' />}
                                                key={value}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            )}
                        </Field>

                        <Typography sx={{ color: red.A200 }} variant="body2">
                            <ErrorMessage name='gender' />
                        </Typography>
                    </Box>

                    <Box>
                        Tecnologias
                        <div className='flex gap-2'>
                            <label className='flex items-center gap-1'>
                                <Field type='checkbox' name='tecnologies.stack' value='frontend' />
                                Front-end
                            </label>
                            <label className='flex items-center gap-1'>
                                <Field type='checkbox' name='tecnologies.stack' value='backend' />
                                Back-end
                            </label>
                            <label className='flex items-center gap-1'>
                                <Field type='checkbox' name='tecnologies.stack' value='mobile' />
                                Mobile
                            </label>
                        </div>

                        <Typography sx={{ color: red.A200 }} variant="body2">
                            <ErrorMessage name='tecnologies.stack' />
                        </Typography>
                    </Box>

                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="color-label">Cor preferida</InputLabel>

                            <Field name='color'>
                                {({ field }: FieldProps) => (
                                    <Select
                                        {...field}
                                        size='small'
                                        labelId="color-label"
                                        variant='standard'
                                    >
                                        <MenuItem value='red'>Red</MenuItem>
                                        <MenuItem value='green'>Green</MenuItem>
                                        <MenuItem value='blue'>Blue</MenuItem>
                                    </Select>
                                )}
                            </Field>
                        </FormControl>

                        <Typography sx={{ color: red.A200 }} variant="body2">
                            <ErrorMessage name='color' />
                        </Typography>
                    </Box>

                    <Box>
                        <Field name='password'>
                            {({ field }: FieldProps) => (
                                <TextField label='Senha' type='password' variant='standard' {...field} sx={{ width: '100%' }} />
                            )}
                        </Field>

                        <Typography sx={{ color: red.A200 }} variant="body2">
                            <ErrorMessage name='password' />
                        </Typography>
                    </Box>

                    <Box>
                        <Field name='passwordConfirm'>
                            {({ field }: FieldProps) => (
                                <TextField label='Confirmação de senha' type='password' variant='standard' {...field} sx={{ width: '100%' }} />
                            )}
                        </Field>

                        <Typography sx={{ color: red.A200 }} variant="body2">
                            <ErrorMessage name='passwordConfirm' />
                        </Typography>
                    </Box>

                    <Button variant='contained' type='submit' sx={{ mt: 3 }}>
                        Enviar
                    </Button>
                </Form>
            </Formik>
        </>
    );
}