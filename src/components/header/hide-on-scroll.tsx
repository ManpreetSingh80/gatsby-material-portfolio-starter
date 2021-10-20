import * as React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

interface Props {
  children: React.ReactElement;
}


export default (props: Props) => {
    const { children } = props;
    const trig = useScrollTrigger({ threshold: 0 });
    const [first, setFirst] = React.useState(true);
    
    React.useEffect(() => {
      if (trig && first) {
        setFirst(false);
      }
    }, [trig])
    
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
  
    return (
      <Slide appear={false} direction="down" in={(!trig && !first)}>
        {children}
      </Slide>
    );
  }