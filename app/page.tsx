"use client"

import React, { useEffect } from "react";
import DogCardsPager from "./components/DogCardsPager";
import { DogContext } from "./api/context/DogContext";
import MultipleSelectChip from "./components/MultipleSelectChip";
import { Button, CircularProgress, Divider, Typography } from "@mui/material";
import { Favorite, Search } from "@mui/icons-material";
import { DogsSearchParams, DogsSearchResponse, dogsService } from "./api/services/dogs-service";
import { Dog, SortString } from "./api/interfaces";
import ZipCodesInput from "./components/ZipCodesInput";
import AgeSlider from "./components/AgeSlider";
import SortingButtons from "./components/SortingButtons";
import DogModal from "./components/DogModal";
import LocationAccordion from "./components/LocationAccordion";

const DOGS_PER_PAGE = 16;

const initSearchParams: DogsSearchParams = {
  size: DOGS_PER_PAGE,
  from: 0,
  breeds: [],
  ageMin: 0,
  ageMax: 15,
  sort: `breed:asc`
};

export default function Home() {

  // State
  const [dogBreeds, setDogBreeds] = React.useState<string[]>([]);
  const [zipCodes, setZipCodes] = React.useState<string[]>([]);
  const [searchedDogs, setSearchedDogs] = React.useState<Dog[]>([]);

  const [searchParams, setSearchParams] = React.useState<DogsSearchParams>(initSearchParams);
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(1);

  const [dogsSearchResponse, setDogsSearchResponse] = React.useState<DogsSearchResponse>();
  const [favoriteDogsIds, setFavoriteDogsIds] = React.useState<string[]>([]);

  const [openMatchModal, setOpenMatchModal] = React.useState<boolean>(false);
  const [dogMatch, setDogMatch] = React.useState<Dog>();


  // Functions
  const onFavoriteChange = (dogId: string) => {
    if (favoriteDogsIds?.length < 100) {

      let newFavorites = [...favoriteDogsIds];
      if (favoriteDogsIds?.some(favId => favId === dogId)) {
        newFavorites = favoriteDogsIds.filter(favId => favId !== dogId);
      } else {
        newFavorites = [...(favoriteDogsIds || []), dogId];
      }
      setFavoriteDogsIds(newFavorites);
    } else {
      alert("You can only select 100 favorite dogs");
    }
  };

  const searchDogsIDs = () => {
    setSearchParams(searchParams);
    dogsService.searchDogsIDs(searchParams).then((res) => {
      setDogsSearchResponse(res);
    });
  };

  const searchDogBreeds = () => {
    dogsService.searchDogBreeds().then((res) => {
      setDogBreeds(res);
    });
  };

  const getDogMatch = () => {
    dogsService.matchDogs(favoriteDogsIds).then((res) => {
      if (res.match) {
        const dogId = res.match;
        dogsService.getDogsByIds([dogId]).then((res) => {
          const dog = res[0];
          setDogMatch(dog);
          setOpenMatchModal(true);
        });
      } else {
        alert("Dog match not found");
      }
    });
  };

  const clearSearch = () => {
    searchDogBreeds();
    setSearchParams(initSearchParams);
    setDogsSearchResponse(undefined);
    setSearchedDogs([]);
    setFavoriteDogsIds([]);
    setZipCodes([]);
    setPage(1);
    setIsSearching(true);
  }

  // Effects
  useEffect(() => {
    searchDogBreeds();
    setPage(1);
    setIsSearching(true);
    setSearchParams({ from: 0 });
  }, [])

  useEffect(() => {
    setIsSearching(true);
    setSearchParams({ ...searchParams, from: (page - 1) * DOGS_PER_PAGE });

  }, [page]);

  useEffect(() => {
    setSearchParams({ ...searchParams, zipCodes: zipCodes });
  }, [zipCodes]);

  useEffect(() => {
    if (isSearching) {
      searchDogsIDs();
    }
  }, [isSearching]);

  useEffect(() => {
    dogsService.getDogsByIds(dogsSearchResponse?.resultIds || []).then((res) => {
      setSearchedDogs(res);
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setIsSearching(false);
    });
  }, [dogsSearchResponse?.resultIds]);

  // Pagination
  const totalPages: number = Math.ceil((dogsSearchResponse?.total || 0) / DOGS_PER_PAGE);

  // Render
  return (
    <>
      <div className="m-4">
        <div id="searchbar" className="flex flex-col m-10 white bg-white rounded-lg shadow-md px-10 py-4 ">
          <Typography variant="h4">
            {`Search by`}
          </Typography>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 items-center pt-4 gap-2 lg:gap-10">
            <div className="flex flex-col">
              <Typography variant="h6">
                {`Dog Breed:`}
              </Typography>
              <MultipleSelectChip
                label="Select dog breeds"
                values={dogBreeds}
                onChange={(values) => {
                  setSearchParams({ ...searchParams, breeds: values });
                }}
              />
            </div>
            <div className="flex flex-col">
              <Typography variant="h6">
                {`Age Range:`}
              </Typography>
              <AgeSlider
                values={[searchParams?.ageMin || 0, searchParams?.ageMax || 15]}
                setValues={(values) => {
                  setSearchParams({ ...searchParams, ageMin: values[0], ageMax: values[1] });
                }}
              />
            </div>
            <div className="flex flex-col">
              <Typography variant="h6">
                {`Zip Codes:`}
              </Typography>
              <ZipCodesInput setZipCodes={setZipCodes} />
            </div>
            <div className="flex flex-col xl:col-span-3">
              <LocationAccordion setZipCodes={setZipCodes} />
            </div>
          </div>

          <div className="flex flex-row gap-4 mt-10">
            <Button
              id="search-button"
              type="submit"
              variant="contained"
              color="success"
              className="w-3/2"
              endIcon={<Search />}
              onClick={(e) => {
                e.preventDefault();
                setIsSearching(true);
              }}>{"Search"}</Button>
            <Button
              id="clear-button"
              type="button"
              variant="contained"
              color="secondary"
              className="w-1/2"
              disabled={!(searchParams?.breeds?.length || zipCodes?.length || favoriteDogsIds?.length)}
              onClick={(e) => {
                e.preventDefault();
                clearSearch();
              }}>{"Clear"}</Button>
          </div>
        </div>

        <div className="flex bg-white flex-col p-8 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <h2 className="text-xl font-bold mx-2">Sort by:</h2>
              <SortingButtons
                value={searchParams?.sort || "breed:asc"}
                onSortChange={(sort: SortString) => {
                  setSearchParams({ ...searchParams, sort: sort });
                  if (page == 1) {
                    setIsSearching(true);
                  } else {
                    setPage(1);
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">
                {`Favorites selected: ${favoriteDogsIds?.length}`}
              </h2>
              <Button
                id="search-button"
                type="submit"
                variant="contained"
                color="success"
                endIcon={<Favorite />}
                disabled={!(favoriteDogsIds?.length)}
                onClick={(e) => {
                  e.preventDefault();
                  getDogMatch();
                }}>{"Find a match"}</Button>
            </div>
          </div>

          <div className="my-2" />
          <Divider />
          <div className="my-2" />
          {isSearching ?
            <div className="flex justify-center items-center h-screen">
              <CircularProgress color="secondary" />
            </div>
            :
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
          }
        </div>
      </div>
      {dogMatch && (
        <DogModal
          open={openMatchModal}
          handleClose={() => {
            setOpenMatchModal(false);
            setDogMatch(undefined);
          }}
          dog={dogMatch}
        />
      )}
    </>
  );
}
