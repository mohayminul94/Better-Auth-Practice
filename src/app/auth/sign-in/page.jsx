"use client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn } from "@/app/lib/auth-client";

const signInPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted with:", data);

    const { data: signInData, error: signInError } = await signIn.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
  };

  const handleGoogleSignIn = async () => {
    const resData = await signIn.social({
      provider: "google",
      callbackUrl: "/",
    });
  };

  return (
    <div>
      <Form
        className="container mx-auto flex m-20 w-96 flex-col gap-4"
        onSubmit={onSubmit}
      >
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>
        <div className="flex gap-2">
          <Button type="submit">
            {/* <Check /> */}
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
        <p>Or</p>
        <Button onClick={handleGoogleSignIn} variant="secondary">
          Sign in With Google
        </Button>
      </Form>
    </div>
  );
};

export default signInPage;
