import * as React from "react";
import Baseline from './baseline';
import Header from '../header/post-header';
import Container from '@material-ui/core/Container';
import HideOnScroll from '../header/hide-on-scroll';

export default ({children, categories}: { children: React.ReactNode, categories: any[] }) => (
    <Baseline>
        {/* Helemt*/}
        {/* <HideOnScroll> */}
            <React.Fragment>
                <Header categories={categories}/>
                {children}
            </React.Fragment>
        {/* </HideOnScroll> */}
    </Baseline>
)