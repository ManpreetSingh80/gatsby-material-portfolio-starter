import * as React from "react";
import {Converter} from 'showdown';
import Product from '../../components/product';
import Baseline from '../../components/layouts/baseline';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/styles';

function handleRender(component) {
    const sheets = new ServerStyleSheets();
  
    // Render the component to a string.
    const html = ReactDOMServer.renderToString(
      sheets.collect(component,),
    );
  
    // Grab the CSS from the sheets.
    const css = sheets.toString();
  
    // Send the rendered page back to the client.
    return {html, css}
  }

export default ({entry, widgetFor}) => {

    const ht = new Converter().makeHtml(entry.getIn(["data", "body"]));
    const frontmatter = entry.getIn(["data"]).toJS();
    const slug = entry.getIn(["slug"]).toString();
    let node = {html: ht, frontmatter, fields: {slug}};
    const component = <Baseline><Product node={node} /></Baseline>;
    const {html, css} = handleRender(component)

    return (
        <> 
            <style>{css}</style>
            {/* tslint:disable:react-no-dangerous-html */}
            <div dangerouslySetInnerHTML={{ __html: html }} />
            {/* tslint:enable:react-no-dangerous-html */}
        </>
    );
}
