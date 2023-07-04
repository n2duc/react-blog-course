import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import AuthenticationPage from './AuthenticationPage';
import Field from '../components/Field/Field';
import Label from '../components/label/Label';
import Input from '../components/input/Input';
import InputTogglePassword from '../components/input/InputTogglePassword';
import Button from '../components/Button/Button';
import { auth } from '../firebase/firsebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import PopupPortal from '../components/modal/PopupPortal';
import Modal from '../components/modal/Modal';

const schema = yup.object({
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
});

const SignInPage = () => {
    const { handleSubmit, control, formState: { isValid, isSubmitting, errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Login"
        if (userInfo?.email) {
            navigate('/');
        }
    }, [userInfo]);

    const handleSignIn = async (values) => {
        if (!isValid) return;
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            toast.success("Login successfully!", {
                position: 'top-right',
                autoClose: 3000,
                pauseOnHover: false,
                delay: 0,
            });
            navigate("/");
        } catch (error) {
            if (error.message.includes("wrong-password")) {
                toast.error("It seems your password was wrong");
            }
            if (error.message.includes("user-not-found")) {
                toast.error("Account doesn't exist. Enter a different account or create new account.")
            }
        }
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

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <AuthenticationPage>
            <form className='form' onSubmit={handleSubmit(handleSignIn)} autoComplete='off'>
                <Field>
                    <Label htmlFor='email'>Email address</Label>
                    <Input
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        control={control}
                    ></Input>
                </Field>
                <Field>
                    <Label htmlFor="password" className="label">Password</Label>
                    <InputTogglePassword control={control}></InputTogglePassword>
                </Field>
                <div className="sign-in-text">
                    <div className="have-account">Don't have account? <NavLink to="/sign-up">Sign Up</NavLink></div>
                    <div className="forget-password" onClick={openModal}>Forget Password?</div>
                    {showModal && (
                        <PopupPortal>
                            <Modal closeModal={closeModal}></Modal>
                        </PopupPortal>
                    )}
                </div>
                <Button
                    type='submit'
                    style={{
                        maxWidth: '240px',
                        width: '100%',
                        margin: '0 auto',
                    }}
                    $isLoading={isSubmitting}
                    disabled={isSubmitting}
                >
                    Login
                </Button>
            </form>
        </AuthenticationPage>
    )
};

export default SignInPage;