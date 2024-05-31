import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const PurchaseNavbar = () => {

    const [menu, setMenu] = useState("shop");

    return (
        <div>
            <div className='navbar shadow-0'>
                <div className="flex flex-wrap place-items-center w-full">
                    <section className="relative w-full">
                        {/* <!-- navbar --> */}
                        <nav className="flex justify-center bg-white text-black w-full">
                            <div className="px-5 xl:px-12 py-4 flex w-full items-center justify-center">
                                {/* <!-- Nav Links --> */}
                                <ul className="flex px-4 mx-auto font-semibold font-heading space-x-12 font-bodoni-ferrara">
                                    <li className="hover:text-red-600" onClick={() => { setMenu("to_pay") }}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/purchase/to_pay'>TO PAY</Link>
                                        {menu === "to_pay" ? <hr className="hr-red" /> : <></>}
                                    </li>
                                    <li className="hover:text-red-600" onClick={() => { setMenu("to_ship") }}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/purchase/to_ship'>TO SHIP</Link>
                                        {menu === "to_ship" ? <hr className="hr-red" /> : <></>}
                                    </li>
                                    <li className="hover:text-red-600" onClick={() => { setMenu("to_receive") }}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/purchase/to_receive'>TO RECEIVE</Link>
                                        {menu === "to_receive" ? <hr className="hr-red" /> : <></>}
                                    </li>
                                    <li className="hover:text-red-600" onClick={() => { setMenu("to_rate") }}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/purchase/to_rate'>TO RATE</Link>
                                        {menu === "to_rate" ? <hr className="hr-red" /> : <></>}
                                    </li>
                                    <li className="hover:text-red-600" onClick={() => { setMenu("canceled_order") }}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/purchase/canceled_order'>CANCELED ORDER</Link>
                                        {menu === "canceled_order" ? <hr className="hr-red" /> : <></>}
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default PurchaseNavbar
