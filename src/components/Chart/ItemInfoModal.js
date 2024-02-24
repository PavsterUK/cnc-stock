import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import styles from './ItemInfoModal.module.css';
import axios from 'axios';
import TransactionsChart from './TransactionsChart';
import { parseISO, format, getYear } from 'date-fns';
import { BASE_URL } from '../../constants/config';
import CloseWindow from '../UI/CloseWindow';

const modalStyle = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
                    console.log(response.data)
                    setTransactions(response.data);
                } catch (error) {
                    console.error('Data fetching failed:', error.message);
                }
            }
        };

        fetchData();
    }, [itemId]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
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
