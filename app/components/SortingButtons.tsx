import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Button, ButtonGroup } from '@mui/material';
import { SortString } from '../api/interfaces';

interface SortingButtonsProps {
    value: SortString;
    onSortChange?: (value: SortString) => void;
}

interface SortParameter {
    breed?: string;
    name?: string;
    age?: string;
}

const initSortParams: SortParameter = {
    breed: undefined,
    name: undefined,
    age: undefined
};

const getValueFromSortField = (sortField: SortString): SortParameter => {
    const [field, order] = sortField.split(":");
    return { [field]: order };
}

const SortingButtons: React.FC<SortingButtonsProps> = ({ value, onSortChange }) => {
    const [sortField, setSortField] = React.useState<SortParameter>(getValueFromSortField(value));

    const getIcon = (param: keyof SortParameter) => {
        if (sortField[param] === undefined) {
            return <></>;
        }
        return sortField[param] == "asc" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />;
    }

    const handleSortChange = (clickedSortField: keyof SortParameter) => {

        const newSortValue = sortField[clickedSortField] === "asc" ? "desc" : "asc";

        // If the clicked sort field is already sorted, we need to toggle the sort order and unset others
        const newSortFields = {
            ...initSortParams,
            [clickedSortField]: newSortValue
        };
        setSortField(newSortFields);

        const newSortValueString = `${clickedSortField}:${newSortValue}` as SortString;
        onSortChange?.(newSortValueString);
    };

    const sortingButtons = Object.keys(initSortParams).map((key) => {
        const sortKey = key as keyof SortParameter;
        return (
            <Button
                key={key}
                startIcon={getIcon(sortKey)}
                onClick={() => handleSortChange(sortKey)}
            >
                {key.charAt(0).toUpperCase() + key.slice(1)}
            </Button>
        );
    });

    return (
        <ButtonGroup
            variant="text"
            aria-label="Sorting button group"
            color="success"
        >
            {sortingButtons}
        </ButtonGroup >
    );
};

export default SortingButtons;