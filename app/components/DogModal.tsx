import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardMedia } from '@mui/material';
import { Dog } from '../api/interfaces';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2,
};

interface DogModalProps {
    open: boolean;
    handleClose: () => void;
    dog: Dog;
}

const DogModal: React.FC<DogModalProps> = ({
    open,
    handleClose,
    dog,
}) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <div className="flex flex-col justify-center items-center">
                    <Typography
                        variant="h3"
                        component="h2"
                        color='success'>
                        {`It's a match!`}
                    </Typography>
                    <CardMedia
                        className="w-1/2"
                        component="img"
                        image={dog.img}
                        sx={{
                            height: 300,
                            minWidth: 250,
                        }}
                    />
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, textAlign: 'center', color: 'black' }}
                        variant="h5"
                    >
                        {`Meet ${dog.name}, a ${dog.age} year old ${dog.breed} from ${dog.zip_code}.`}
                    </Typography>
                </div>
            </Box>
        </Modal >
    );
}


export default DogModal;
