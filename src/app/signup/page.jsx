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
  TextField,
} from '@heroui/react';
import { redirect } from 'next/navigation';
import React from 'react';

const SignUpPage = () => {
  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // console.log("Form Data to Send:", user);

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (data) {
      redirect('/');
    }
    if (error) {
      alert('Error');
    }

    // console.log({data,error})
  };

  return (
    <div className="max-w-7xl mx-auto mt-7">
      <div className="text-center my-3">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-gray-500">Start your adventure with Wonderlast</p>
      </div>
      <Card className="border rounded-none p-6 flex items-center justify-center">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
          {/* Name Field */}
          <TextField isRequired name="name">
            <Label>Name</Label>
            <Input name="name" placeholder="Enter Your Name" />
            <FieldError />
          </TextField>

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

          {/* Image URL Field */}
          <TextField isRequired name="image" type="url">
            <Label>Image URL</Label>
            <Input name="image" placeholder="Image URL" />
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
              Create Account
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;
