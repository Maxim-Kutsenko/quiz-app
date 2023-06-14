import styled from 'styled-components'
import { cssVariables } from '../cssVariables'
export const Title = styled.h1`
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
  
    @media(max-width:${cssVariables.$phoneMiddleScreen}) {
      font-size: 20px;
    }
`
