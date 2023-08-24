import React, { useState } from 'react'
import HeaderContext from './HeaderContext'

const HeaderState = (props) => {

    const [header, setHeader] = useState("Header")
   const update = ((s) => {
        setHeader(s)
    })

    return (
        <>
            <HeaderContext.Provider value={{header, update}}>
                {props.children}
            </HeaderContext.Provider>

        </>
    )
}

export default HeaderState