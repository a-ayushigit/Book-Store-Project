import React from 'react'
import Item from './Item'
import {BESTSELLERS, CATEGORIES , QUICKLINKS , CONTACTINFO} from './FooterMenu'

const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <Item Links={BESTSELLERS} title="BESTSELLERS"/>
      <Item Links={CATEGORIES} title="CATEGORIES"/>
      <Item Links={QUICKLINKS} title="QUICK LINKS"/>
      <Item Links={CONTACTINFO} title="CONTACT INFO"/>
    </div>
  )
}

export default ItemsContainer
