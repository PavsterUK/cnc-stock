import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { HorizontalRule, Add } from '@mui/icons-material';
import styles from './StockItemModal.module.css';
import AddOrEditStockItem from './AddOrEditStockItem';
import axios from 'axios';
import { BASE_URL } from '../../constants/config';
import CloseWindow from '../UI/CloseWindow';
import ItemInfoModal from '../Chart/ItemInfoModal';

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
  padding: 0
};

export default function StockItemModal({ stockItemData, setStockItems, stockItems }) {
  const [open, setOpen] = React.useState(false);
  const [isTake, setIsTake] = React.useState(true);
  const [vendQty, setVendQty] = React.useState(1);
  const [feedbackMessage, setFeedbackMessage] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFeedbackMessage('');
  };

  const decreaseNumber = () => {
    setVendQty(prevNumber => (prevNumber > 1 ? prevNumber - 1 : 1));
  };

  const increaseNumber = () => {
    setVendQty(prevNumber => prevNumber + 1);
  };

  const handleToggleTakeorReturn = () => {
    setIsTake(!isTake);
  };

  const handleVending = (vendQty, isTake) => {
    if (isTake) {
      const newStockQty = stockItemData.stockQty - vendQty;
      if (newStockQty < 0) {
        return setFeedbackMessage(`Bloody hell mate, can't you do basic math?`);
      } else {
        stockItemData.stockQty = newStockQty; // Update stockQty
      }
    } else {
      stockItemData.stockQty += vendQty;
    }

    axios
      .put(`${BASE_URL}/api/stock-item/${stockItemData.id}`, stockItemData)
      .then(response => {
        setFeedbackMessage(
          `You ${isTake ? 'took' : 'returned'} ${vendQty} item(s).  ${stockItemData.stockQty} left in stock`,
        );
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setFeedbackMessage(error.response.data);
        } else {
          setFeedbackMessage(`Error occurred ${isTake ? 'taking' : 'returning'} item.`);
        }
      });
  };

  function getStockQtyColor() {
    const colors = ['#FF2400', '#ffc300', '#7eea50']; //red, orange , green
    const qty = stockItemData.stockQty;
    const minQty = stockItemData.minQty;
    let color = colors[2];
    if (qty === minQty) color = colors[1];
    if (qty < minQty) color = colors[0];

    return color;
  }

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
            color: '#fff',
            textTransform: 'capitalize',
            height: '100%!important',
          }}
        >
          <div className={styles.location}>
            <h5>Location</h5>
            {stockItemData.location}
          </div>
          <div className={styles.itemDescriptionWrapper}>
            <div className={styles.itemInfo__subCategory}>{stockItemData.subCategoryName}</div>
            <div>
              <div className={styles.itemTitleAndDescriptionWrapper}>
                <h2 className={styles.itemTitle}>{stockItemData.title}</h2>
                <div className={styles.itemDescription}>
                  <p>{stockItemData.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.itemInfo}>
            <div className={styles.itemInfo__brand}>{stockItemData.brand}</div>
            <div className={styles.itemInfo__supplier}>{stockItemData.supplier}</div>
          </div>
          <div className={styles.itemMaterials}>
            <div
              style={{
                backgroundColor: stockItemData.materials.includes('P') ? '#0eb6f7' : 'transparent',
              }}
              className={styles.itemMaterials__p}
            ></div>
            <div
              style={{
                backgroundColor: stockItemData.materials.includes('M') ? '#f6ea02' : 'transparent',
              }}
              className={styles.itemMaterials__m}
            ></div>
            <div
              style={{
                backgroundColor: stockItemData.materials.includes('K') ? '#e31c1e' : 'transparent',
              }}
              className={styles.itemMaterials__k}
            ></div>
            <div
              style={{
                backgroundColor: stockItemData.materials.includes('N') ? '#2dc65b' : 'transparent',
              }}
              className={styles.itemMaterials__n}
            ></div>
            <div
              style={{
                backgroundColor: stockItemData.materials.includes('S') ? '#f77b00' : 'transparent',
              }}
              className={styles.itemMaterials__s}
            ></div>
            <div
              style={{
                backgroundColor: stockItemData.materials.includes('H') ? '#bababa' : 'transparent',
              }}
              className={styles.itemMaterials__h}
            ></div>
          </div>
          <div className={styles.itemQty}>
            <div className={styles.itemQty__title}>Stock Qty</div>
            <div className={styles.itemQty__value} style={{ color: getStockQtyColor() }}>
              {stockItemData.stockQty}
            </div>
          </div>
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className={styles.topButtonsWrapper}>
            <div className={styles.buttonRow}>
              <AddOrEditStockItem
                isEditMode
                stockItemData={stockItemData}
                setStockItems={setStockItems}
                stockItems={stockItems}
              />
              <ItemInfoModal itemId={stockItemData.id} />
            </div>
            <CloseWindow handleClose={handleClose} />
          </div>
          <Typography sx={{ fontWeight: 'bold' }} variant="h5" margin={'1em'} component="h2" align="center">
            {stockItemData.title}
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }} variant="h5" component="h2" align="center">
            Location : {stockItemData.location}
          </Typography>

          <div className={styles.vendingQuantity}>
            <Button variant="contained" color="primary" onClick={decreaseNumber}>
              <HorizontalRule />
            </Button>

            <Typography padding="0 1em" variant="h4" component="h2" align="center">
              {vendQty}
            </Typography>

            <Button variant="contained" color="primary" onClick={increaseNumber}>
              <Add />
            </Button>
          </div>

          <div className={styles.vendingOptions}>
            <Button
              onClick={() => handleVending(vendQty, false)}
              fullWidth
              variant="contained"
              color="success"
              disabled={isTake}
            >
              Return
            </Button>
            <Switch className={styles.toggleSwitch} checked={isTake} onChange={handleToggleTakeorReturn} />
            <Button
              onClick={() => handleVending(vendQty, true)}
              fullWidth
              variant="contained"
              color="error"
              disabled={!isTake}
            >
              Take
            </Button>
          </div>
          <Typography mt={'1em'} color="error" variant="h4" component="h2" align="center">
            {feedbackMessage}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
