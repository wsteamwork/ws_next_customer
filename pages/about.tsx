import React, { useEffect, useContext } from 'react';
import { NextPage, NextPageContext } from 'next';
import { ProfileContext, IProfileContext } from '@/store/Context/Profile/ProfileContext';

const About: NextPage = () => {
  const { state, dispatch } = useContext<IProfileContext>(ProfileContext);
  useEffect(() => {
    console.log(state);
  }, [state]);
  return <h1>Hello Westay Team 😃</h1>;
};

export default About;
