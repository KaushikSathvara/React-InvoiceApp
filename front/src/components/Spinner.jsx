import React from 'react'

export default function Spinner({ text }) {
    return (
        <div className='d-flex justify-content-center align-self-center mt-5'>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
}
