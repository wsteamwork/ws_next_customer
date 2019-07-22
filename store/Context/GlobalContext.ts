import { createContext } from 'react';
import { WithWidth } from '@material-ui/core/withWidth';
import { WithRouterProps } from 'next/dist/client/with-router';

export const GlobalContext = createContext<IGlobalContext>(null as IGlobalContext);

export interface IGlobalContext extends WithWidth, WithRouterProps {}
