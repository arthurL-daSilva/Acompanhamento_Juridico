import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalContent = styled.div`
  background: #fff;
  padding: 24px 32px;
  border-radius: 12px;
  max-width: 400px;
  width: 50%;
  border: ${({ $SucessBorder, $ConfirmBorder }) => 
    $SucessBorder ? "2px solid green" : !$ConfirmBorder ? "2px solid red" : "2px solid orange"};
  text-align: center;
  position: relative;
  color: #000;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #000000;
`

export const Confirmation_button = styled.button`
    color: #fff;
    width: 170px;
    height: 48px;
    padding: 16px 33px;
    border-radius: 9px;
    background: orange;
    border: none;
    font-family: inherit;
    text-align: center;
    cursor: pointer;
    transition: box-shadow 250ms, transform 250ms, background-color 0.8s ease;
   
    &:hover{
        box-shadow: 7px 5px 56px -2px orange;
        transition: box-shadow 250ms, background-color 0.8s ease;
        svg{
            transition: transform 0.2s ease;
            transform: rotate(180deg);
        }
    }

    &:active{
        transform: scale(0.97);
        box-shadow: 7px 5px 56px -10px orange;
        transition: box-shadow 250ms, transform 250ms, background-color 0.8s ease;

    }
`