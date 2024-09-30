'use client'
import React from 'react'
import styles from "./Title.module.css"

function Title() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className={styles.title}>CAR MARKET</h2>
                </div>
            </div>
        </div>
    );
}

export default Title;
