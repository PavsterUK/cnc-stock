import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { Box, Typography, Button, Grid } from '@mui/material/';
import axios from 'axios';
import { BASE_URL } from '../../constants/config';
import CloseWindow from '../UI/CloseWindow';
import LowStockLevelItem from './LowStockLevelItem';
import styles from './LowStockItemsModal.module.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100dvw',
    minHeight: '100dvh',
    maxHeight: '100dvh',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'auto',
    padding: 0,
};

export default function PurchaseRequestsManager() {
    const [open, setOpen] = useState(false);
    const [lowStockItems, setLowStockItems] = useState([]);

    console.log(lowStockItems)

    function sortItemsBySubcategory(items) {
        return items.sort((a, b) => {

            if (a.stockItem.subCategory.subCategoryName < b.stockItem.subCategory.subCategoryName) return -1;
            if (a.stockItem.subCategory.subCategoryName > b.stockItem.subCategory.subCategoryName) return 1;

            return 0;
        });
    }

    useEffect(() => {
        const fetchPurchaseRequests = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/low-stock-items`);

                setLowStockItems(response.data);
            } catch (error) {
                // Handle error if the request fails
                console.error('Error fetching low stock items:', error);
            }
        };
        fetchPurchaseRequests();
    }, [open]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button variant="contained" align="center" onClick={handleOpen} fullWidth>
                Low Stock Items
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        ...style,
                    }}
                >
                    <div className={styles.stickyHeader}>
                        <Typography variant="h5" component="h2" align="center" style={{ fontWeight: 'bold', paddingLeft: "1em" }}>
                            LOW STOCK ITEMS
                        </Typography>
                        <CloseWindow handleClose={handleClose} />
                    </div>
                    <Grid item xs={12} md={12} lg={12}>
                        {sortItemsBySubcategory(lowStockItems).map(item => (
                            <LowStockLevelItem key={item.id} data={item} />
                        ))}
                    </Grid>
                </Box>
            </Modal>
        </>
    );
}
