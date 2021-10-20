import * as React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import theme from '../../theme';

export default (props: { children: React.ReactNode }) => {
    const {children} = props;
    let chosenTheme = null;
    let systemTheme = null;
    
    if (typeof window !== 'undefined') {
        chosenTheme = window.localStorage.getItem('themeType');
        systemTheme = window.getComputedStyle(document.documentElement).getPropertyValue('content').replace(/"/g, '');
    }

    let themeType:'light'|'dark' = 'light';

    if (chosenTheme === 'light' || chosenTheme === 'dark') {
        themeType = chosenTheme;
    } else if (systemTheme === 'light' || systemTheme === 'dark') {
        themeType = systemTheme;
    }

    const [mode, setMode] = React.useState<'light' | 'dark'>(themeType);

    // we change the palette type of the theme in state
    const toggleTheme = () => {
        const newPaletteType = mode === "light" ? "dark" : "light";
        window.localStorage.setItem('themeType', newPaletteType);
        setMode(newPaletteType);
    };

    theme.palette.type = mode;
    const background = mode === 'dark' ? {default: '#121212', paper: '#121212'} : {default: '#fff', paper: '#fff'};

    const muiTheme = createTheme(Object.assign({props: {}}, theme, {props: {toggleTheme, mode}, palette: Object.assign({}, theme.palette, {type: mode, background: background})}));

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline/>
                <div className='MuiPaper-root' style={{minHeight: '100vh'}}>
                    {children}
                </div>
        </MuiThemeProvider>
    )
}