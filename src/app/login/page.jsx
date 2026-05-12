'use client';
import { authClient } from '@/lib/auth-client';
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from '@heroui/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // console.log("Form Data to Send:", user);

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    console.log({ data, error });

    if (data) {
      redirect('/');
    }
    if (error) {
      alert('Error');
    }

    // console.log({data,error})
  };

  const handleGoogleSignin = async () => {
      await authClient.signIn.social({
        provider: "google"
      })
    }

  return (
    <div className="max-w-7xl mx-auto mt-7">
      <div className="text-center my-3">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-gray-500">Start your adventure with Wonderlast</p>
      </div>
      <Card className="border rounded-none p-6 flex items-center justify-center">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={value => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return 'Please enter a valid email address';
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input name="email" placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={value => {
              if (value.length < 8)
                return 'Password must be at least 8 characters';
              if (!/[A-Z]/.test(value))
                return 'Need at least one uppercase letter';
              if (!/[0-9]/.test(value)) return 'Need at least one number';
              return null;
            }}
          >
            <Label>Password</Label>
            <Input name="password" placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <div className="flex justify-center gap-2">
            <Button
              className={'rounded-none w-full bg-cyan-500 text-white'}
              type="submit"
            >
              Login
            </Button>
          </div>
        </Form>

        <div className="flex justify-center items-center gap-3">
                    <Separator/>
                   <div className="whitespace-nowrap"> Or sign up with </div>
                      <Separator/>
                    </div>
                
                <div className='w-full'>
                  <Button onClick={handleGoogleSignin} variant='outline' className={'w-full rounded-none'}><FcGoogle />Sign in with Google</Button>
                </div>
      </Card>
    </div>
  );
};

export default LoginPage;
