import { Box, Button, Input } from '@mui/material';
import { ISummaryCart, ProductDetailsLabels } from '../types/Types';
import { useState } from 'react';

//////////ToDo move to settings
const promoToTest = ['Rs-school', 'student1', 'student2'];
////////////////////Store #2
const discountKeyToStore = 'OA_discount';

const SummaryCart = (props: ISummaryCart) => {
  const [isPromo, setIsPromo] = useState<boolean[]>(promoToTest.map(() => false));
  const [implementedDiscount, setImplementedDiscount] = useState<string[]>(
    (localStorage.getItem(discountKeyToStore || '{}') &&
      JSON.parse(localStorage?.getItem(discountKeyToStore || '{}') || '')) ||
      []
  );
  const [inputValue, setInputValue] = useState<string>('');
  const falsePromoArr = promoToTest.map(() => false);
  const discountItemIndex = isPromo.indexOf(true);
  const tempImplementedDiscount = [...implementedDiscount];

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const promoCode = event.target.value;
    const indexOfPromoCode = promoToTest.indexOf(promoCode);
    if (indexOfPromoCode > -1) {
      const tempPromoArr = [...isPromo];
      tempPromoArr[indexOfPromoCode] = true;
      setIsPromo(tempPromoArr);
    } else setIsPromo(falsePromoArr);
    setInputValue(promoCode);
  }

  function onClickHandler() {
    if (tempImplementedDiscount.indexOf(promoToTest[discountItemIndex]) === -1) {
      tempImplementedDiscount.push(promoToTest[discountItemIndex]);
    }
    localStorage.setItem(discountKeyToStore, JSON.stringify(tempImplementedDiscount));
    window.dispatchEvent(new Event('discountSet'));
    setInputValue('');
    setIsPromo(falsePromoArr);
  }

  window.addEventListener('discountSet', () => {
    setImplementedDiscount(tempImplementedDiscount);
  });

  const removeHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const clickedButton = event.target as HTMLImageElement;
    const indexOfClickedButton = tempImplementedDiscount.indexOf(clickedButton.name);
    tempImplementedDiscount.splice(indexOfClickedButton, 1);
    localStorage.setItem(discountKeyToStore, JSON.stringify(tempImplementedDiscount[0] ? tempImplementedDiscount : []));
    window.dispatchEvent(new Event('discountSet'));
  };

  const isPromoFunc = (props: boolean[]) => {
    return props.map((item, index) => {
      if (item) {
        return (
          <Box key={index}>
            {promoToTest[index]} -10%
            <Button onClick={onClickHandler}>Add</Button>
          </Box>
        );
      }
    });
  };

  const implementedDiscountFunc = (discountArr: string[]) => {
    if (!discountArr[0]) {
      return (
        <Box>
          Total {ProductDetailsLabels.Currency}: {props.totalSum}.00
        </Box>
      );
    }
    return (
      <Box>
        <Box sx={{ textDecoration: 'line-through' }}>
          Total {ProductDetailsLabels.Currency}: {props.totalSum}.00
        </Box>
        <Box>
          Total {ProductDetailsLabels.Currency}: {Math.ceil(props.totalSum / (1 + 0.1 * discountArr.length))}.00
        </Box>
        {discountArr.map((item, index) => {
          return (
            <Box key={index}>
              {item} is applied
              <Button onClick={removeHandler} name={item}>
                Remove
              </Button>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        ////////////To change
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: 'solid black 1px',
        marginTop: '4rem',
        height: '20rem',
      }}>
      <Box>Summary</Box>
      <Box>Products: {props.totalItems}</Box>
      <Box>{implementedDiscountFunc(implementedDiscount)}</Box>
      <Box>
        PromoCode
        <Input size="small" type="string" onChange={onChangeHandler} value={inputValue} />
      </Box>
      <Box>
        Promo to test:
        {promoToTest.map((item, index) => (
          <Box key={index}>{item}</Box>
        ))}
        {isPromoFunc(isPromo)}
      </Box>

      <Button variant="contained">Buy now</Button>
    </Box>
  );
};

export default SummaryCart;
