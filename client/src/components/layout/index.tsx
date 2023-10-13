import React from 'react'
import style from "./index.module.css"
import {Layout as AntLayout} from 'antd';
import { Header } from '../header';

type Props = {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = ({children}) => {
  return (
    <div className= {style.main}>
    <Header/>
    <AntLayout.Content style={{height: "100%"}}>
    {children}
    </AntLayout.Content>
    </div>
  )
}
