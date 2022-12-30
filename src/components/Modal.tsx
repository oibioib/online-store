import { Box, Button, Input, Paper } from '@mui/material';
import { useState } from 'react';
import Image from 'mui-image';
import RSlogo from '../theme/cardImg/rs_school.svg';
import VisaLogo from '../theme/cardImg/visa.svg';
import MasterCardLogo from '../theme/cardImg/Mastercard.svg';
import AmericanExpressLogo from '../theme/cardImg/American_Express.svg';
const ModalCart = () => {
  const [customerName, setCustomerName] = useState('');
  const [isCustomerName, setIsCustomerName] = useState(false);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [isCustomerPhoneNumber, setIsCustomerPhoneNumber] = useState(false);
  const [customerAddress, setCustomerAddress] = useState('');
  const [isCustomerAddress, setIsCustomerAddress] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [isCustomerEmail, setIsCustomerEmail] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [isCardNumber, setIsCardNumber] = useState(false);
  const [cardUrl, setCardUrl] = useState(RSlogo);

  function customerNameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const tempInput = event.target.value.split(' ');
    const [firstWord, secondWord] = tempInput;
    console.log(firstWord, secondWord);
    if (!(firstWord?.length >= 3) || !(secondWord?.length >= 3)) {
      setIsCustomerName(true);
    } else setIsCustomerName(false);
    setCustomerName(event.target.value);
  }

  function customerPhoneNumberHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const tempInput = event.target.value;
    const tempInputNumber = tempInput.slice(1);
    if (tempInput[0] !== '+' || isNaN(Number(tempInputNumber)) || tempInputNumber.length < 9) {
      setIsCustomerPhoneNumber(true);
    } else setIsCustomerPhoneNumber(false);
    setCustomerPhoneNumber(event.target.value);
  }

  function customerAddressHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const tempInput = event.target.value.split(' ');
    const [firstWord, secondWord, thirdWord] = tempInput;
    if (!(firstWord?.length >= 5) || !(secondWord?.length >= 5) || !(thirdWord?.length >= 5)) {
      setIsCustomerAddress(true);
    } else setIsCustomerAddress(false);
    setCustomerAddress(event.target.value);
  }

  function customerEmailHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const specialChars = '[`!#$%^&*()_+-=[]{};\':"\\|,<>/?~]/';
    const tempInput = event.target.value;
    const secondPart = tempInput.split('@').at(-1);
    const domain = secondPart?.split('.').at(-1);
    if (
      !tempInput.includes('@') ||
      tempInput.indexOf('@') !== tempInput.lastIndexOf('@') ||
      specialChars.split('').some((specialChar) => secondPart?.includes(specialChar)) ||
      !secondPart?.includes('.') ||
      secondPart.indexOf('.') !== secondPart.lastIndexOf('.') ||
      !domain ||
      (domain && domain.length < 2)
    ) {
      setIsCustomerEmail(true);
    } else setIsCustomerEmail(false);
    setCustomerEmail(event.target.value);
  }

  function cardNumberHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const tempInput = +event.target.value.replaceAll(' ', '');
    if (!isNaN(tempInput) && !(tempInput.toString().length > 16)) {
      if (tempInput.toString().length < 16) {
        setIsCardNumber(true);
      } else setIsCardNumber(false);
      const tempOutPut = [];
      for (let i = 0; i < tempInput.toString().length; i++) {
        tempOutPut.push(tempInput.toString().split('')[i]);
        if ((i + 1) % 4 === 0 && tempInput.toString().split('')[i + 1]) {
          tempOutPut.push(' ');
        }
      }
      setCardNumber(tempInput ? tempOutPut.join('').toString() : '');
      switch (tempInput.toString()[0]) {
        case '4':
          setCardUrl(VisaLogo);
          break;
        case '5':
          setCardUrl(MasterCardLogo);
          break;
        case '3':
          setCardUrl(AmericanExpressLogo);
          break;
        default:
          setCardUrl(RSlogo);
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      Personal details
      <Box>
        <Input error={isCustomerName} placeholder="Name" onChange={customerNameHandler} value={customerName} />
        {isCustomerName && (
          <Box component="div" sx={{ display: 'inline', color: 'red' }}>
            Error
          </Box>
        )}
      </Box>
      <Box>
        <Input
          type="tel"
          placeholder="Phone number"
          error={isCustomerPhoneNumber}
          onChange={customerPhoneNumberHandler}
          value={customerPhoneNumber}
        />
        {isCustomerPhoneNumber && (
          <Box component="div" sx={{ display: 'inline', color: 'red' }}>
            Error
          </Box>
        )}
      </Box>
      <Box>
        <Input
          placeholder="Delivery address"
          error={isCustomerAddress}
          onChange={customerAddressHandler}
          value={customerAddress}
        />
        {isCustomerAddress && (
          <Box component="div" sx={{ display: 'inline', color: 'red' }}>
            Error
          </Box>
        )}
      </Box>
      <Box>
        {' '}
        <Input
          placeholder="E-mail"
          type="email"
          error={isCustomerEmail}
          onChange={customerEmailHandler}
          value={customerEmail}
        />
        {isCustomerEmail && (
          <Box component="div" sx={{ display: 'inline', color: 'red' }}>
            Error
          </Box>
        )}
      </Box>
      <Box>
        <Box>Credit Card details</Box>
        <Paper sx={{ width: '20rem', height: '10rem', m: '1rem', backgroundColor: 'blueviolet' }}>
          <Box sx={{ display: 'flex' }}>
            {' '}
            <Box sx={{ marginLeft: '1rem', marginTop: '2rem' }}>
              <Image src={`${cardUrl}`} alt="card Brand" width="2rem" height="2rem" fit="fill" />{' '}
            </Box>
            <Input
              sx={{ border: 'solid 1px black', marginLeft: '1rem', marginTop: '2rem' }}
              error={isCardNumber}
              type="tel"
              value={cardNumber}
              onChange={cardNumberHandler}
              placeholder="Card Number"
            />
          </Box>
        </Paper>
        <Button variant="contained">Confirm</Button>
      </Box>
    </Box>
  );
};

export default ModalCart;
