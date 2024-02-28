import React from 'react';
import styles from './LowStockLevelItem.module.css';

const LowStockLevelItem = ({ data }) => {

    function getStockQtyColor() {
        const colors = ['#FF2400', '#ffc300', '#7eea50']; //red, orange , green
        const qty = data.stockItem.stockQty;
        const minQty = data.stockItem.minQty;
        let color = colors[2];
        if (qty === minQty) color = colors[1];
        if (qty < minQty) color = colors[0];

        return color;
    }

    return (
        <div className={styles.card}>
            <div className={styles.location}>
                <h5>Location</h5>
                {data.stockItem.location}
            </div>
            <h2 className={styles.itemTitle}>{data.stockItem.title}</h2>
            <div className={styles.itemDescription}>
                <p>{data.stockItem.description}</p>
            </div>
            <div className={styles.itemInfo}>
                <div className={styles.itemInfo__subCategory}>{data.stockItem.subCategory.subCategoryName}</div>
                <div className={styles.itemInfo__brand}>{data.stockItem.brand}</div>
                <div className={styles.itemInfo__supplier}>{data.stockItem.supplier}</div>
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
