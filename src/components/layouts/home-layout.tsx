import * as React from "react";
import Baseline from './baseline';
import Header from '../header';
import Container from '@material-ui/core/Container';

export default ({children, categories}: { children: React.ReactNode, categories: any[] }) => (
    <Baseline>
        <React.Fragment>
            <Header categories={categories} />
            <Container className='MuiPaper-root'>
                {children}
            </Container>
        </React.Fragment>
    </Baseline>
)