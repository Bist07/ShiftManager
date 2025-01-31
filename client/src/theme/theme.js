import components from './components';
import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';

export const darkTheme = createTheme({
    palette: palette.dark,
    typography,
    components,
});

export const lightTheme = createTheme({
    palette: palette.light,
    typography,
    components,
});

export default darkTheme;
