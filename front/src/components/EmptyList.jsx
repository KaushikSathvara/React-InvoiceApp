import React from 'react'
import { EMPTY_MAN } from '../utils/common'

export default function EmptyList({ text, children }) {
    return (
        <div className="flex-column d-flex justify-content-center align-items-center">
            <img src={EMPTY_MAN} className="img-fluid align-self-center" width={250} alt={text} />
            <h4 className="mt-3 text-muted text-center">{text}</h4>
            {children}
        </div>
    )
}
