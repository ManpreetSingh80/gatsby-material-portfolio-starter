import CMS from 'netlify-cms-app';

import PagePreview from './previews/pages';
import BlogPreview from './previews/blog';

CMS.registerPreviewTemplate("pages", PagePreview);
CMS.registerPreviewTemplate("blog", BlogPreview);