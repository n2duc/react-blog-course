import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

import Label from '../components/label/Label';
import Input from '../components/input/Input';
import Field from '../components/Field/Field';
import InputTogglePassword from '../components/input/InputTogglePassword';
import Button from '../components/Button/Button';
import { auth, db } from '../firebase/firsebase-config';
import { NavLink, useNavigate } from 'react-router-dom';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import AuthenticationPage from './AuthenticationPage';

const schema = yup.object({
    fullname: yup
        .string()
        .required("Please enter your fullname"),
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
});

const SignUpPage = () => {
    const navigate = useNavigate();
    const { 
        control, 
        handleSubmit, 
        formState: { errors, isValid, isSubmitting }, 
        watch,
        reset,
    } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

    const handleSignUp = async (values) => {
        console.log(values);
        if (!isValid) return;
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        await updateProfile(auth.currentUser, {
            displayName: values.fullname,
        });
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            createdAt: serverTimestamp(),
        });
        toast.success(`Register successfully!`, {
            position: 'top-right',
            autoClose: 3000,
            pauseOnHover: false,
            delay: 0,
        });
        navigate("/");
    };

    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                position: 'top-right',
                autoClose: 3000,
                pauseOnHover: false,
                delay: 0,
            });
        }
    }, [errors]);

    useEffect(() => {
        document.title = "Register";
    }, []);

    return (
        <AuthenticationPage>
            <form className='form' onSubmit={handleSubmit(handleSignUp)} autoComplete='off'>
                <Field>
                    <Label htmlFor="fullname" className="label">Fullname</Label>
                    <Input 
                        type="text"
                        name="fullname"
                        placeholder='Enter your fullname'
                        control={control}
                    />
                </Field>
                <Field>
                    <Label htmlFor="email" className="label">Email</Label>
                    <Input 
                        type="email"
                        name="email"
                        placeholder='Enter your email'
                        control={control}
                    />
                </Field>
                <Field>
                    <Label htmlFor="password" className="label">Password</Label>
                    <InputTogglePassword control={control}></InputTogglePassword>
                </Field>
                <div className="have-account">Already have an account? <NavLink to="/sign-in">Login</NavLink></div>
                <Button type='submit' kind="primary"  $isLoading={isSubmitting} disabled={isSubmitting} style={{
                    maxWidth: '240px',
                    width: '100%',
                    margin: '0 auto',
                }}>
                    Sign Up
                </Button>
            </form>
        </AuthenticationPage>
    )
}

export default SignUpPage;