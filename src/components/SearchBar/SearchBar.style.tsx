import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  margin: 120px auto;
  text-align: center;
  /* background-color: blue; */
`;

export const Header = styled.h2`
  /* text-align: center; */
  font-size: 20px;
  font-weight: 700;
  line-height: 1.6;
  background-color: antiquewhite;
  margin-bottom: 40px;
`;

export const Form = styled.form`
  /* text-align: center; */
`;

export const Label = styled.label`
  position: relative;
  background-color: #fff;
`;

export const Input = styled.input`
  background-color: yelloww;
  width: 70%;
  border-radius: 20px;
  padding: 20px 10px 20px 24px;
`;

export const Button = styled.button`
  border: none;
  position: absolute;
  width: 48px;
  height: 48px;
  bottom: -15px;
  right: 5px;
  background: #357ae1;
  color: #fff;
  border-radius: 50px 50px;
  cursor: pointer;
`;
