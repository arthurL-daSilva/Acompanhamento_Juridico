import styled from "styled-components"

export const Client_form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    .input-group{
        display: flex;
        align-items: center;
        gap: 20px;
        padding-bottom: 10px;
        text-align: end;

        .input{
            width: 30vw;
        }

        textarea{
            padding: 1rem 1rem;
            height: 100px;
            resize: none;
        }
    }

    .input, .input-select {
        height: 44px;
        background-color: #00000039;
        color: #fff;
        border-radius: .5rem;
        padding: 0 1rem;
        border: 2px solid transparent;
        font-size: 1rem;
        transition: border-color .3s cubic-bezier(.25,.01,.25,1) 0s, color .3s cubic-bezier(.25,.01,.25,1) 0s,background .2s cubic-bezier(.25,.01,.25,1) 0s;
    }

    .label {
        font-size: .9rem;
        font-weight: bold;
        width: 150px;
        color: #CDAF6F;
        transition: color .3s cubic-bezier(.25,.01,.25,1) 0s;
    }

    .input:hover, .input:focus, .input-group:hover .input, select:focus  {
        outline: none;
        border-color: #fff;
    }

    .left-form{
        display: flex;
        flex-direction: column;
    }

    .input-group-select{
        display: flex;
        align-items: center;
        gap: 20px;

        option{
            background-color: #00000039;
            color: #000;
        }

        .label{
            text-align: end;
        }
    }    

    .form-button{
        margin-top: 40px;
    }
`

export const Client_button = styled.button`
    color: #fff;
    margin-top: 30px;
    padding: 16px 33px;
    border-radius: 9px;
    background: #CDAF6F;
    border: none;
    font-family: inherit;
    text-align: center;
    cursor: pointer;
    transition: all 250ms;
    
    &:hover{
        box-shadow: 7px 5px 56px -2px #CDAF6F;
        transition: all 250ms;
    }

    &:active{
        transform: scale(0.97);
        box-shadow: 7px 5px 56px -10px #CDAF6F;
        transition: all 250ms;
    }
`

export const Clients_list = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    padding: 1rem;

    .clientes-card{
        background-color: #f9f9f984;
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 24px;
        box-shadow: 0px 2px 6px rgba(0,0,0,0.1);

        h3 {
            margin-bottom: 0.5rem;
            color: #333;
        }

        p {
            margin: 0.2rem 0;
            color: #555;
        }

        hr {
            margin: 1rem 0 0.5rem 0;
        }
    }
`