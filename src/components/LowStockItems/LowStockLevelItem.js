import React from 'react';
import styles from './LowStockLevelItem.module.css';
import { parseISO, format } from 'date-fns';
import { Select, MenuItem } from '@mui/material/';
import { BASE_URL } from '../../constants/config';
import axios from 'axios';

const LowStockLevelItem = ({ data }) => {
    const [isOrdered, setIsOrdered] = React.useState(data.ordered);
    const [orderDate, setOrderDate] = React.useState(data.orderDate);

    const itemOrderStatus = isOrdered ? 'Purchased' : 'Not Purchased';

    const dropdownBgColor = isOrdered ? '#4CAF50' : '#9E9E9E';

    function getStockQtyColor() {
        const colors = ['#FF2400', '#ffc300', '#7eea50']; //red, orange , green
        const qty = data.stockItem.stockQty;
        const minQty = data.stockItem.minQty;
        let color = colors[2];
        if (qty === minQty) color = colors[1];
        if (qty < minQty) color = colors[0];

        return color;
    }

    function parseAndFormatDate(date) {
        const parseItemAddedDate = parseISO(date);
        return format(parseItemAddedDate, 'd MMMM, yyyy');
    }

    const toggleItemPurchaseStatus = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/api/low-stock-item/${data.id}`);
            const toggledItem = response.data;
            setIsOrdered(toggledItem.ordered);
            setOrderDate(toggledItem.orderDate);
        } catch (error) {
            console.error('Error updating low stock item', error);
        }
    };

    const dropdown = (
        <Select
            value={itemOrderStatus}
            onChange={toggleItemPurchaseStatus}
            sx={{
                backgroundColor: dropdownBgColor,
                zIndex: 0,
            }}
        >
            <MenuItem value="Purchased">
                <div>
                    Purchased
                    <br />
                    {orderDate === null ? '' : parseAndFormatDate(orderDate)}
                </div>
            </MenuItem>
            <MenuItem value="Not Purchased">Not Purchased</MenuItem>
        </Select>
    );

    return (
        <div className={styles.card}>
            <div className={styles.location}>
                <h5>Location</h5>
                {data.stockItem.location}
            </div>
            <div className={styles.itemDescriptionWrapper}>
                <div className={styles.itemInfo__subCategory}>{data.stockItem.subCategory.subCategoryName}</div>
                <div>
                    <div className={styles.itemTitleAndDescriptionWrapper}>
                        <h2 className={styles.itemTitle}>{data.stockItem.title}</h2>
                        <div className={styles.itemDescription}>
                            <p>{data.stockItem.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.itemInfo}>
                <div className={styles.itemInfo__brand}>{data.stockItem.brand}</div>
                <div className={styles.itemInfo__supplier}>{data.stockItem.supplier}</div>
            </div>

            {dropdown}
            <div className={styles.lowItemInfo}>
                <h3>Low From </h3>
                <h3>{parseAndFormatDate(data.dateAdded)}</h3>
            </div>
            <div className={styles.itemQty}>
                <div className={styles.itemQty__title}>Stock Qty</div>
                <div className={styles.itemQty__value} style={{ color: getStockQtyColor() }}>
                    {data.stockItem.stockQty}
                </div>
            </div>
        </div>
    );
};

export default LowStockLevelItem;
