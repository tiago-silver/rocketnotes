import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
    grid-area: header;

    height: 106px;
    width: 100%;

    border-bottom: 1px solid ${({theme}) => theme.COLORS.BACKGROUND_700};

    display: flex;
    justify-content: space-between;

    padding: 0 80px;

    
`
export const Profile = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: none;
    border: none;

    >img{
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }

    >div{
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-left: 16px;
        line-height: 24px;

        span{
            font-size: 14px;
            color: ${({theme}) => theme.COLORS.GRAY_100};
        }

        strong{
            font-size: 18px;
            color: ${({theme}) => theme.COLORS.WHITE};
        }
    }
`
export const Logout = styled.button`
    border: none;
    background: none;

    >svg{
        color: ${({theme}) => theme.COLORS.GRAY_100};
        font-size: 36px;
    }
`;