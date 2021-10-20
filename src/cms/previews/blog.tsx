import * as React from "react";
import {Converter} from 'showdown';
import Blog from '../../components/blog';
import * as config from '../../../config/SiteConfig.js'
import Baseline from '../../components/layouts/baseline';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/styles';

const kebabCase = (v) => v.toLowerCase().replace(/[^a-zA-Z0-9 -]/g, '').replace(/\s+/g, '-')

function handleRender(component) {
    const sheets = new ServerStyleSheets();
  
    // Render the component to a string.
    const html = ReactDOMServer.renderToString(
      sheets.collect(component,),
    );
  
    // Grab the CSS from the sheets.
    const css = sheets.toString();
  
    // Send the rendered page back to the client.
    return {html, css, comp: sheets.getStyleElement()}
  }

export default (props) => {
    const {entry, widgetFor} = props;
    const ht = new Converter().makeHtml(entry.getIn(["data", "body"]));
    const frontmatter = entry.getIn(["data"]).toJS();
    const author = config.postDefaultAuthor;
    const slug = kebabCase(entry.getIn(['data', "title"]))
    let node = {html: ht, excerpt: ht, frontmatter: Object.assign({author}, frontmatter), timeToRead: 5, fields: {slug}};
    const component = <Baseline><Blog node={node} /></Baseline>;
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
