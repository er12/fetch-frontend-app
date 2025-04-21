import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, CircularProgress } from '@mui/material';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import TextInput from './TextInput';
import { usStatesAndTerritoriesAbbreviations } from '../api/constants';
import { GeoBoundingBox, Location, LocationSearchParams } from '../api/interfaces';
import MultipleSelectChip from './MultipleSelectChip';
import GeoBoundingBoxForm from './GeoBoundingBoxForm';
import { locationsService } from '../api/services/locations-service';
import LocationsDataTable from './LocationsDataTable';

const CODES_PER_PAGE = 25;

interface LocationAccordionProps {
    setZipCodes?: React.Dispatch<React.SetStateAction<string[]>>;
}

const initSearchParams: LocationSearchParams = {
    city: "",
    states: [],
    size: CODES_PER_PAGE,
    from: 0,
    geoBoundingBox: undefined,
}

const LocationAccordion: React.FC<LocationAccordionProps> = ({ setZipCodes }) => {

    const [locationParams, setLocationParams] = useState<LocationSearchParams>(initSearchParams);
    const [fetchedLocations, setFetchedLocations] = useState<Location[]>([]);

    const [geoBoundingBox, setGeoBoundingBox] = useState<GeoBoundingBox>();
    const [isSearching, setIsSearching] = React.useState<boolean>(false);
    const [page, setPage] = React.useState(1);

    const searchGeoLocations = React.useCallback(() => {
        locationsService.searchLocations(locationParams).then((res) => {
            setFetchedLocations(res.results);
        }).finally(() => {
            setIsSearching(false);
        });
    }, [locationParams]);

    useEffect(() => {
        if (isSearching) {
            searchGeoLocations();
        }
    }, [isSearching, searchGeoLocations]);

    useEffect(() => {
        // setIsSearching(true);
        setLocationParams((prevParams) => ({
            ...prevParams,
            from: (page - 1) * CODES_PER_PAGE,
            geoBoundingBox: geoBoundingBox
        }));
    }, [page, geoBoundingBox]);

    const clearSearch = () => {
        setLocationParams(initSearchParams);
        setPage(1);
        setFetchedLocations([]);
    }

    return (
        <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`location-search-panel`}
                id={`location-search-panel`}
            >
                <Typography component="span">{`Location search`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className='flex flex-col lg:flex-row gap-5'>

                    <div className="flex flex-col gap-2 lg:w-1/3">
                        <TextInput
                            label='City'
                            placeholder='New York'
                            value={locationParams?.city || ""}
                            onChange={(event) => setLocationParams({ ...locationParams, city: event.target.value })}
                        />
                        <MultipleSelectChip
                            label="States"
                            values={usStatesAndTerritoriesAbbreviations}
                            onChange={(values) => {
                                setLocationParams({ ...locationParams, states: values });
                            }}
                        />
                    </div>
                    <div className="flex lg:w-1/3 p-2">
                        <GeoBoundingBoxForm setGeoBoundingBox={setGeoBoundingBox} />
                    </div>
                    <div className="flex lg:w-1/3 p-2">
                        {isSearching ?
                            <div className="flex m-auto justify-center items-center">
                                <CircularProgress color="secondary" />
                            </div>
                            :
                            <LocationsDataTable
                                locations={fetchedLocations}
                                setZipCodes={setZipCodes} />
                        }
                    </div>
                </div>

                <div className="flex flex-row gap-4 mt-10">
                    <Button
                        id="search-locations"
                        type="button"
                        variant="contained"
                        color="secondary"
                        className="w-full"
                        endIcon={<LocationPinIcon />}
                        onClick={() => {
                            setIsSearching(true);
                        }}>{"Search zipcodes"}</Button>
                    <Button
                        id="clear-button"
                        type="button"
                        variant="outlined"
                        color="secondary"
                        className="w-1/2"
                        disabled={!(locationParams?.city || locationParams?.states?.length)}
                        onClick={(e) => {
                            e.preventDefault();
                            clearSearch();
                        }}>{"Clear"}</Button>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default LocationAccordion;