import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import TransactionsChart from './TransactionsChart';
import { BASE_URL } from '../../constants/config';
import CloseWindow from '../UI/CloseWindow';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    minHeight: '90vh',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
};

export default function ItemInfoModal({ itemId }) {
    const [open, setOpen] = React.useState(false);
    const [transactions, setTransactions] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (itemId) {
                try {
                    const response = await axios.get(`${BASE_URL}/api/transactions/${itemId}`);
                    console.log(response.data);
                    setTransactions(response.data);
                } catch (error) {
                    console.error('Data fetching failed:', error.message);
                }
            }
        };

        fetchData();
    }, [itemId]);

    return (
        <div>
            <div>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleOpen}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',

                        textTransform: 'capitalize',
                        height: '100%!important',
                    }}
                >
                    STATS
                </Button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <CloseWindow handleClose={handleClose} />
                    <TransactionsChart data={transactions} />
                </Box>
            </Modal>
        </div>
    );
}
