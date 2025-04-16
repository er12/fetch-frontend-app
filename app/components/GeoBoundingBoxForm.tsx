import React, { useEffect, useState } from "react";
import {
  TextField, MenuItem, Select, InputLabel, FormControl,
  Grid, Button, Typography
} from "@mui/material";
import { Coordinates, GeoBoundingBox } from "../api/interfaces";

interface GeoSearchInputsParams {
  setGeoBoundingBox?: React.Dispatch<React.SetStateAction<GeoBoundingBox | undefined>>;
}

const GeoBoundingBoxForm: React.FC<GeoSearchInputsParams> = ({ setGeoBoundingBox }) => {
  const [geoMode, setGeoMode] = useState("top_left_bottom_right")
  const [boundingBoxState, setBoundingBoxState] = useState<GeoBoundingBox>();

  useEffect(() => {
    setGeoBoundingBox?.(boundingBoxState ?? undefined);
  }, [boundingBoxState])


  const updateGeoMode = (value: string) => {
    if (value === "") {
      setBoundingBoxState(undefined);
    }
    setGeoMode(value);
  }

  const handleChange = (field: keyof GeoBoundingBox, value: number) => {
    setBoundingBoxState((prev) => ({ ...prev ?? {}, [field]: value } as GeoBoundingBox));
  };

  const handleGeoChange = (point: keyof GeoBoundingBox,
    coord: keyof Coordinates,
    value: number
  ) => {
    setBoundingBoxState((prev) => ({
      ...prev ?? {},
      [point]: {
        ...prev?.[point] as Coordinates,
        [coord]: value,
      },
    } as GeoBoundingBox));

  };

  const parseEToFloat = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    return parseFloat(e.target.value);
  }

  const renderGeoInputs = () => {
    const createTextField = (label: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => (
      <TextField label={label} type="number" onChange={onChange} fullWidth />
    );

    const createGeoPair = (title: string, key: string) => (
      <>
        <Typography>{title}</Typography>
        {createTextField("Lat", (e) => handleGeoChange(key as keyof GeoBoundingBox, "lat", parseEToFloat(e)))}
        {createTextField("Lon", (e) => handleGeoChange(key as keyof GeoBoundingBox, "lon", parseEToFloat(e)))}
      </>
    );

    switch (geoMode) {
      case "top_left_bottom_right":
        return (
          <>
            {createTextField("Top (Latitude)", (e) => handleChange("top", parseEToFloat(e)))}
            {createTextField("Left (Longitude)", (e) => handleChange("left", parseEToFloat(e)))}
            {createTextField("Bottom (Latitude)", (e) => handleChange("bottom", parseEToFloat(e)))}
            {createTextField("Right (Longitude)", (e) => handleChange("right", parseEToFloat(e)))}
          </>
        );
      case "bottom_left_top_right":
        return (
          <>
            {createGeoPair("Bottom Left", "bottom_left")}
            {createGeoPair("Top Right", "top_right")}
          </>
        );
      case "bottom_right_top_left":
        return (
          <>
            {createGeoPair("Bottom Right", "bottom_right")}
            {createGeoPair("Top Left", "top_left")}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Grid container size={12}>
      <FormControl sx={{ minWidth: 300, width:"100%" }}>
        <InputLabel>GeoBoundingBox Mode</InputLabel>
        <Select
          value={geoMode}
          label={"GeoBoundingBox Mode"}
          onChange={(e) => updateGeoMode(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="top_left_bottom_right">Top, Left, Bottom, Right</MenuItem>
          <MenuItem value="bottom_left_top_right">Bottom Left, Top Right</MenuItem>
          <MenuItem value="bottom_right_top_left">Bottom Right, Top Left</MenuItem>
        </Select>
      </FormControl>
      <div>{renderGeoInputs()}</div>
    </Grid>
  );
};

export default GeoBoundingBoxForm;
