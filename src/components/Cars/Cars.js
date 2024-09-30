'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import carData from '@/data/data.json'
import styles from "./Cars.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function Cars() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [filteredCars, setFilteredCars] = useState(carData);
    const [selectedCar, setSelectedCar] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const search = decodeURIComponent(searchParams.get('search') || '').trim();
        const normalizedSearchTerms = search.split(/\s+/).map(term => term.toLowerCase());

        if (normalizedSearchTerms.length > 0) {
            const filtered = carData.map(carType => ({
                ...carType,
                cars: carType.cars.filter(car => {
                    const normalizedDesc = car.desc.replace(/\s+/g, '').toLowerCase();
                    const normalizedPrice = car.Price.replace(/\s+/g, '').toLowerCase();
                    
                    return normalizedSearchTerms.every(term => 
                        normalizedDesc.includes(term) || normalizedPrice.includes(term)
                    );
                })
            })).filter(carType => carType.cars.length > 0);

            setFilteredCars(filtered);
            console.log('Filtered Cars:', filtered);
        } else {
            setFilteredCars(carData);
        }
    }, [searchParams]);

    const handleCarClick = (car) => {
        setSelectedCar(car);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCar(null);
    };

    return (
        <div className='container mt-5'>
            <ul className="row">
                {filteredCars.map((item, typeIndex) => (
                    item.cars.map((ele, carIndex) => (
                        <div 
                            className="col-lg-4 col-6 mb-3" 
                            key={`${typeIndex}-${carIndex}`} 
                            onClick={() => handleCarClick(ele)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card">
                                <div className={styles.content}>
                                    <img className="card-img-top p-2" id={styles.photo} src={ele.Photo} alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{ele.desc}</h5>
                                        <p className="card-text" id={styles.price}>{ele.Price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ))}
            </ul>
            {selectedCar && (
                <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="carModel" aria-hidden="true">
                    <div className="modal-dialog " id={styles.right} role="document">
                        <div className="modal-content">
                            
                            <div className="modal-body">
                                <img src={selectedCar.Photo} alt={selectedCar.desc} className="img-fluid" />
                                <p><strong>Description:</strong> {selectedCar.desc}</p>
                                <p><strong>Price:</strong> {selectedCar.Price}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => alert('Buying now!')}>BUY NOW</button>
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cars;
