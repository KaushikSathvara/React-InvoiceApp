import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

export default function Breadcrumb() {
    const [MyList, setMyList] = useState([])
    const history = useHistory()
    useEffect(() => {
        console.log(history.location);
        var list_items = history.location.pathname.split("/")
        var my_list_items = []
        list_items.map((item, idx) => {
            if (idx == list_items.length - 1) {
                my_list_items.push({
                    isActive: true,
                    value: item
                })
            } else {
                my_list_items.push({
                    isActive: false,
                    value: item
                })
            }
        })
        setMyList([...MyList, ...my_list_items])
    }, [history])

    useEffect(() => {
        // var last_item = MyList[MyList.length - 1]
        console.log(MyList)

    }, [MyList])

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {/* <li className="breadcrumb-item active" aria-current="page">Home</li>
                <li className="breadcrumb-item"><a href="#">key</a></li> */}
                {
                    MyList.map((item, key) => (
                        <li className={`breadcrumb-item ${item.isActive ? "active" : ""}`} key={key}><a href="#">{item.value}</a></li>
                    ))
                }
            </ol>
        </nav>
    )
}
