"use client"

import React from "react";
import { Dog } from "../api/interfaces";
import { Pagination } from "@mui/material";
import DogCard from "./DogCard";

interface DogCardsPagerProps {
  dogs: Dog[];
  currentPage?: number;
  pages?: number;
  favorites?: string[];
  onPageChange?: (page: number) => void;
}

// If you want to change the columns, you can change the class name here
const GRID_CLASS_NAME = "grid grid-cols-4 justify-items-center gap-4";

export default function DogCardsPager({
  dogs,
  currentPage,
  pages,
  favorites,
  onPageChange,
}: DogCardsPagerProps) {

  return (
    <>
      <div className={GRID_CLASS_NAME}>
        {
          dogs.map((dog, index) => (
            <DogCard
              key={`${index}-${dog.id}`}
              dog={dog}
              isFavorite={favorites?.some(favId => favId === dog.id)}
            />
          ))
        }
      </div>
      <div className="flex justify-center">
        <Pagination
          page={currentPage as number}
          count={pages as number}
          onChange={(e, val: number) => onPageChange?.(val)}
        />
      </div>
    </>
  );
}
