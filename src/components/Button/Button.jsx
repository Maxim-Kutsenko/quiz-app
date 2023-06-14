import styled, { css } from 'styled-components'
import { cssVariables } from '../cssVariables'

export const Button = styled.button`
    position: relative;
    border: 0;
    background-color: ${cssVariables.$uiBackground};
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 50%;
    min-height: 60px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
    box-shadow: 2px 1px 10px #3e3333;
    margin-bottom: 20px;
    transition: transform 0.5s;
    transform: scale(1);
    @media(max-width:${cssVariables.$tableScreen}) {
      width: 80%;
    }
  
    @media(max-width:${cssVariables.$phoneMiddleScreen}) {
      width: 100%;
      font-size: 16px;
      min-height: 50px
    }
    &:hover {
      opacity: 0.9;
    }
    &:disabled {
      cursor: not-allowed;
      background-color: #4a4747;
    }
    &:active {
      transform: scale(1.1);
    }
    ${props => props.notActive && css`
      cursor: not-allowed;
      background-color: #4a4747;
    `}
    ${props => props.active && css`
      color: #000;
      background: #fff;
    `}
    ${props => props.small && css`
      width: 50px;
      display: inline-flex;
      margin-right: 10px;
    `}
    ${props => props.modal && css`
      width: 85px!important;
      padding: 5px;
      min-height: 40px;
      font-size: 15px;
    `}
    ${props => props.select && css`
      text-align: center;
      margin: 0;
      height: 50px;
    `}
    ${props => props.center && css`
      margin-inline: auto;
    `}
    ${props => props.navBtn && css`
      width: 120px!important;
      background-color: #fff;
      color: #000;
      transform: scale(1);
      margin: 0;
  
      @media(max-width:${cssVariables.$phoneMiddleScreen}) {
        width: 80px!important;
        font-size: 12px;
      }
    `}

`


