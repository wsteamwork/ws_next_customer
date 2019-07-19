import { createContext } from 'react';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

export const GlobalContext = createContext<IGlobalContext>(null as IGlobalContext);

export interface IGlobalContext {
    width: Breakpoint
}
