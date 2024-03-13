import React from 'react';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import Button from '@mui/material/Button';

const CloseWindow = ({ handleClose, styles }) => {
    return (
        <Button color="error" sx={{ margin: 0, padding: 0, ...styles }} onClick={handleClose}>
            <CancelSharpIcon fontSize="large" />
        </Button>
    );
};

export default CloseWindow;
