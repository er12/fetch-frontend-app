"use client"

import React from "react";
import Link from "next/link";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { Dog } from "../api/interfaces";
import { IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useDog } from "../api/context/DogContext";

interface DogCardProps {
  dog: Dog;
  isFavorite?: boolean;
}

export default function DogCard({ dog, isFavorite }: DogCardProps) {
  const { onFavoriteChange } = useDog();


  return (
    <Card
      sx={{
        minWidth: 250,
        maxWidth: 250,
        margin: 2,
        border: 3,
        borderColor: isFavorite ? "red" : "success.main",
        borderRadius: 2,
        boxShadow: 3,
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.05)",
          transition: "transform 0.2s",
        },
        
        "@media (min-width: 1024px)": {
          minWidth: 300,
          margin: 3,
          boxShadow: 4,
        },
        "@media (min-width: 1920px)": {
          minWidth: 400,
          margin: 3,
          boxShadow: 4,
        },
      }}>
      <CardMedia
        component="img"
        height="140"
        image={dog.img}
        alt={`${dog.name} ${dog.breed}`}
        sx={{ height: 300 }}
      />
      <CardContent>
        <Typography variant="h4" >
          {dog.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {`Breed:  ${dog.breed}`}
          <br />
          {`Age:  ${dog.age}`}
          <br />
          {`Zip code:  ${dog.zip_code}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {onFavoriteChange && (
          <IconButton aria-label="add to favorites" onClick={() => onFavoriteChange(dog.id)}>
            <FavoriteIcon color={isFavorite ? "error" : "action"} />
          </IconButton>
        )}
        <IconButton aria-label="share">
          <Link href={`https://www.google.com/search?q=${dog.breed}`} target="_blank" rel="noopener noreferrer">
            <ShareIcon />
          </Link>
        </IconButton>
      </CardActions>
    </Card>
  );
}
