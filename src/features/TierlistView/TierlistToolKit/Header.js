import React from 'react'
import styled from 'styled-components'

function Header() {
    return (
        <StyledHeader>
            Tierlist Toolkit
        </StyledHeader>
    )
}

let StyledHeader = styled.div`
    width: 100%;
    height: 80px;
    flex-shrink: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
`

export default Header
