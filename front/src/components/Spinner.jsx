import React from 'react'

export default function Spinner({ text }) {
    return (
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">{text || "Loading.."}</span>
        </div>
    )
}
