import React from 'react';
import styles from './LowStockLevelItem.module.css';
import { parseISO, format } from 'date-fns';
import { Select, MenuItem } from '@mui/material/';

const LowStockLevelItem = ({ data }) => {
    const [isOrdered, setIsOrdered] = React.useState(data.ordered);

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

    const parseItemAddedDate = parseISO(data.dateAdded);
    const formattedAddedDate = format(parseItemAddedDate, 'd MMMM, yyyy');

    const dropdown = (
        <Select
            value={itemOrderStatus}
            onChange={event => setIsOrdered(event)}
            sx={{
                backgroundColor: dropdownBgColor,

                zIndex: 0,
            }}
        >
            <MenuItem value="Purchased">
                <div>
                    Purchased on
                    <br />
                    {new Date().toLocaleDateString()}
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

            <div className={styles.itemQty}>
                <div className={styles.itemQty__title}>Stock Qty</div>
                <div className={styles.itemQty__value} style={{ color: getStockQtyColor() }}>
                    {data.stockItem.stockQty}
                </div>
            </div>
            <div className={styles.lowItemInfo}>
                <h3>Dropped On</h3>
                <h3>{formattedAddedDate}</h3>
            </div>
            {dropdown}
        </div>
    );
};

export default LowStockLevelItem;
