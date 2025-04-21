"use client"

import React, { useState } from "react";
import TextInput from "../components/TextInput";
import { useRouter } from "next/navigation";
import { userService } from "../api/services/users-services";
import { User } from "../api/interfaces";
import { useUserContext } from "../api/context/UserContext";
import { Button, Typography } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';

export default function Login() {
  const router = useRouter();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const { setUserName } = useUserContext();

  const logIn = () => {
    const user: User = {
      name,
      email
    };
    userService.logIn(user).then(() => {
      console.log("Logged in successfully: ");

      setUserName(name);

      router.push("/");
    }).catch((err) => {
      console.log("Error logging in: ", err);
    });
  };


  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
        <Typography variant="h4" gutterBottom>
          Welcome
        </Typography>
        <form className="flex flex-col gap-4 min-w-[400px] text-md" onSubmit={(e) => {
          e.preventDefault();
          logIn();
        }}>
          <div className=" grid">
            <Typography variant="h6" gutterBottom>
              <label htmlFor="email">Name:</label>
            </Typography>
            <TextInput
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" grid">
            <Typography variant="h6" gutterBottom>
              <label htmlFor="email">Email:</label>
            </Typography>
            <TextInput
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />

          <Button
            color="inherit"
            variant="contained"
            type="submit"
            endIcon={<PetsIcon />}
          >
            <Typography variant
              ="button"
              sx={{
                fontSize: 16,
                fontWeight: "bold",
                paddingTop: .5
              }}>
              {"Log In"}
            </Typography>
          </Button>

        </form>
      </div>
    </div>
  );
}