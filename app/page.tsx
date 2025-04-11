"use client"

import React, { useEffect } from "react";
import DogCardsPager from "./components/DogCardsPager";
import { DogContext } from "./api/context/DogContext";
import MultipleSelectChip from "./components/MultipleSelectChip";
import { Autocomplete, Button, CircularProgress, Slider, TextField, Typography } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { DogsSearchParams, DogsSearchResponse, dogsService } from "./api/services/dogs-service";
import { Dog } from "./api/interfaces";
import ZipCodesInput from "./components/ZipCodesInput";

const DOGS_PER_PAGE = 16;

export default function Home() {
  const [dogBreeds, setDogBreeds] = React.useState<string[]>([]);
  const [zipCodes, setZipCodes] = React.useState<string[]>([]);
  const [searchedDogs, setSearchedDogs] = React.useState<Dog[]>([]);

  const [searchParams, setSearchParams] = React.useState<DogsSearchParams>({ size: DOGS_PER_PAGE, from: 0 });
  const [isSearching, setIsSearching] = React.useState<boolean>(false);

  const [dogsSearchResponse, setDogsSearchResponse] = React.useState<DogsSearchResponse>();
  const [favoriteDogsIds, setFavoriteDogsIds] = React.useState<string[]>([]);

  const [page, setPage] = React.useState(1);

  // Functions
  const onFavoriteChange = (dogId: string) => {
    let newFavorites = [...favoriteDogsIds];
    if (favoriteDogsIds?.some(favId => favId === dogId)) {
      newFavorites = favoriteDogsIds.filter(favId => favId !== dogId);
    } else {
      newFavorites = [...(favoriteDogsIds || []), dogId];
    }
    setFavoriteDogsIds(newFavorites);
  };

  const searchDogsIDs = () => {
    setSearchParams(searchParams);
    dogsService.searchDogsIDs(searchParams).then((res) => {
      setDogsSearchResponse(res);
    });
  };

  const clearSearch = () => {
    setSearchParams({ size: DOGS_PER_PAGE, from: 0 });
    setDogsSearchResponse(undefined);
    setSearchedDogs([]);
    setPage(1);
    setIsSearching(true);
  }

  // Effects
  useEffect(() => {
    dogsService.fetchDogBreeds().then((res) => {
      setDogBreeds(res);
    });
    setPage(1);
    setIsSearching(true);
    setSearchParams({ from: 0 });
  }, [])

  useEffect(() => {
    setIsSearching(true);
    setSearchParams({ ...searchParams, from: (page - 1) * DOGS_PER_PAGE });
  }, [page]);

  useEffect(() => {
    if (isSearching) {
      searchDogsIDs();
    }
  }, [isSearching]);

  useEffect(() => {
    dogsService.getDogsByIds(dogsSearchResponse?.resultIds || []).then((res) => {
      setSearchedDogs(res);
      setIsSearching(false);
    }).catch((err) => {
      console.error(err);
      setIsSearching(false);
    });
  }, [dogsSearchResponse?.resultIds]);

  // Pagination
  const totalPages: number = Math.ceil((dogsSearchResponse?.total || 0) / DOGS_PER_PAGE);

  // Render
  return isSearching ? (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress color="secondary" />
    </div>
  )
    : (
      <div className="m-4">
        <div id="searchbar" className="flex flex-col m-10 white bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-4 gap-4 p-4">
            <Typography color="black" variant="h6" className="flex text-lg font-semibold gap-3">
              <Favorite className="text-red-500" />
              {`Favorites ${favoriteDogsIds?.length}`}
            </Typography>
            <MultipleSelectChip
              label="Dog breeds"
              values={dogBreeds}
              onChange={(values) => {
                setSearchParams({ ...searchParams, breeds: values });
              }} />
            <ZipCodesInput setZipCodes={setZipCodes} />
            <div className="flex flex-row gap-4">
            <Typography color="black" variant="h6" className="flex text-lg font-semibold gap-3">
              {`Age`}
              </Typography>
              <Slider
                value={value1}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                disableSwap
              />
            </div>
            <div className="flex flox-row gap-4 p-4">
              <Button
                id="search-button"
                type="submit"
                variant="contained"
                color="success"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSearching(true);
                }}>{"Search"}</Button>
              <Button
                id="clear-button"
                type="button"
                variant="contained"
                color="info"
                disabled={!(searchParams?.breeds?.length || zipCodes?.length)}
                className="flex flex-grow-[.2]"
                onClick={(e) => {
                  e.preventDefault();
                  clearSearch();
                }}>{"Clear"}</Button>
            </div>
          </div>

          <DogContext.Provider value={{ onFavoriteChange }}>
            <DogCardsPager
              dogs={searchedDogs}
              favorites={favoriteDogsIds}
              currentPage={page}
              pages={totalPages}
              onPageChange={(page) => {
                setPage(page);
              }}
            />
          </DogContext.Provider>
        </div >
        );
}
