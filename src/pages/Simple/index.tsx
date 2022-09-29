import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';


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

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                bornDate: '',
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
                <label htmlFor='name' className='flex flex-col'>
                    Nome
                    <Field id='name' name='name' className='border-solid border px-2' />

                    <div className='text-red-500 text-sm'>
                        <ErrorMessage name='name' />
                    </div>
                </label>

                <label htmlFor='email' className='flex flex-col'>
                    E-mail
                    <Field id='email' name='email' type='email' className='border-solid border px-2' />

                    <div className='text-red-500 text-sm'>
                        <ErrorMessage name='email' />
                    </div>
                </label>

                <label htmlFor='bornDate' className='flex flex-col'>
                    Nascimento
                    <Field id='bornDate' name='bornDate' type='date' className='border-solid border px-2' />

                    <div className='text-red-500 text-sm'>
                        <ErrorMessage name='bornDate' />
                    </div>
                </label>

                <label htmlFor='height' className='flex flex-col'>
                    Altura
                    <Field id='height' name='height' type='number' className='border-solid border px-2' />

                    <div className='text-red-500 text-sm'>
                        <ErrorMessage name='height' />
                    </div>
                </label>

                <div className='flex flex-col'>
                    Sexo
                    <div className='flex gap-2'>
                        <label className='flex items-center gap-1'>
                            <Field name='gender' value='man' type='radio' />
                            Masculino
                        </label>
                        <label className='flex items-center gap-1'>
                            <Field name='gender' value='woman' type='radio' />
                            Feminino
                        </label>
                    </div>

                    <div className='text-red-500 text-sm'>
                        <ErrorMessage name='gender' />
                    </div>
                </div>

                <div className='flex flex-col'>
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

                    <div className='text-red-500 text-sm'>
                        <ErrorMessage name='tecnologies.stack' />
                    </div>
                </div>

                <label htmlFor='color' className='flex flex-col'>
                    Cor preferida
                    <Field as='select' name='color' className='border-solid border px-2'>
                        <option value=''>Selecione uma cor</option>
                        <option value='red'>Red</option>
                        <option value='green'>Green</option>
                        <option value='blue'>Blue</option>
                    </Field>

                    <div className='text-red-500 text-sm'>
                        <ErrorMessage name='color' />
                    </div>
                </label>

                <label htmlFor='password' className='flex flex-col'>
                    Senha
                    <Field id='password' name='password' type='text' className='border-solid border px-2' />

                    <div className='text-red-500 text-sm'>
                        <ErrorMessage name='password' />
                    </div>
                </label>

                <label htmlFor='passwordConfirm' className='flex flex-col'>
                    Confirmação de senha
                    <Field id='passwordConfirm' name='passwordConfirm' type='text' className='border-solid border px-2' />

                    <div className='text-red-500 text-sm'>
                        <ErrorMessage name='passwordConfirm' />
                    </div>
                </label>

                <button type='submit' className='bg-sky-300 hover:bg-sky-400 mt-4 py-2'>
                    Enviar
                </button>
            </Form>
        </Formik>
    );
}