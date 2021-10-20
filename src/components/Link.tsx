import * as React from 'react';
import MuiLink from '@material-ui/core/Link';
import {LinkProps} from '@material-ui/core/Link/Link';
import { Link as GatsbyLink } from 'gatsby';

interface MLinkProps extends LinkProps {
    to: any
}


const Link = React.forwardRef<HTMLAnchorElement, MLinkProps>(
    (props: any, ref) => {
        const internal = /^\/(?!\/)/.test(props.to);
        if (internal) {
            return (<MuiLink component={GatsbyLink} ref={ref} {...props} />)
        } else {
            return (<MuiLink href={props.to} ref={ref} {...props} />)
        }
        
    }
);

export default Link;