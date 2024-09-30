'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from "./New.module.css"
import { useDebounce } from 'use-debounce'

function New() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [text, setText] = useState('');
    const [query] = useDebounce(text, 500);

    useEffect(() => {
        if (query) {
            router.push(`?search=${query}`);
        } else if (searchParams.get('search')) {
            // If the query is empty and there is a search param in the URL, clean the URL
            router.push('/');
        }
    }, [query, router, searchParams]);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    <h2 className={styles.title}>VEHICLES AVAILABLE</h2>
                </div>
                <div className='col-6'>
                    <input
                        type='text'
                        value={text}
                        placeholder='search vehicles...'
                        onChange={e => setText(e.target.value)}
                        className={styles.search}
                    />
                </div>
            </div>
        </div>
    );
}

export default New;
