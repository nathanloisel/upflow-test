import React from 'react';
import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import compress from 'koa-compress';
import helmet from 'koa-helmet';
import Router from 'koa-router';

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { ApolloProvider } from '@apollo/client/react';
import {
  ServerStyleSheet as SCServerStyleSheet,
  StyleSheetManager as SCStyleSheetManager,
} from 'styled-components';
import { HelmetProvider, FilledContext, HelmetData } from 'react-helmet-async';
import { createMemoryHistory } from 'history';

import App from './App';
import { apolloClient } from './graphql/apollo';
import { ThemeProvider } from './styling/theme';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

interface RouterState {
  helmetContext: HelmetData;
  styledComponentsTags: string;
  markup: string;
}

export const serverHistory = createMemoryHistory();

// Initialize `koa-router` and setup a route listening on `GET /*`
// Logic has been splitted into two chained middleware functions
// @see https://github.com/alexmingoia/koa-router#multiple-middleware
const router = new Router<RouterState>();
router.get(
  '(.*)',
  async (ctx, next) => {
    const cookie = ctx.cookies;
    const context: StaticRouterContext = {};
    const styledComponentsSheets = new SCServerStyleSheet();
    const helmetContext = {};
    const cookieConsent = cookie.get('mt_consent_given');
    global.cookieConsent = cookieConsent === 'true';
    const modules: Array<string> = [];

    const markup = renderToString(
      styledComponentsSheets.collectStyles(
        <ApolloProvider client={apolloClient}>
          <HelmetProvider context={helmetContext}>
            <SCStyleSheetManager sheet={styledComponentsSheets.instance}>
              <ThemeProvider>
                <StaticRouter context={context} location={ctx.url}>
                  <App />
                </StaticRouter>
              </ThemeProvider>
            </SCStyleSheetManager>
          </HelmetProvider>
        </ApolloProvider>
      )
    );
    ctx.state.helmetContext = (helmetContext as FilledContext).helmet;
    ctx.state.styledComponentsTags = styledComponentsSheets.getStyleTags();
    ctx.state.markup = markup;
    return next();
  },
  (ctx) => {
    ctx.status = 200;
    ctx.body = `<!doctype html ${ctx.state.helmetContext.htmlAttributes.toString()}>
        <html lang="">
        <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta http-equiv="Content-Security-Policy" content="">
          <meta charSet='utf-8' />
          ${ctx.state.helmetContext.title.toString()}
          ${ctx.state.helmetContext.meta.toString()}
          ${ctx.state.helmetContext.link.toString()}
          ${ctx.state.helmetContext.base.toString()}
          ${ctx.state.helmetContext.style.toString()}
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''
          }
          ${ctx.state.styledComponentsTags}
        </head>
        <body ${ctx.state.helmetContext.bodyAttributes.toString()}>
          ${ctx.state.helmetContext.noscript.toString()}
          <div id="root">${ctx.state.markup}</div>
          ${ctx.state.helmetContext.script.toString()}
          <script src="${assets.client.js}" defer crossorigin></script>
        </body>
    </html>`;
  }
);

// Intialize and configure Koa application
const server = new Koa();
server
  // `koa-helmet` provides security headers to help prevent common, well known attacks
  // @see https://helmetjs.github.io/
  .use(
    helmet({
      contentSecurityPolicy: false,
      permittedCrossDomainPolicies: false,
    })
  )
  .use(
    compress({
      threshold: 2048,
      gzip: {
        flush: require('zlib').constants.Z_SYNC_FLUSH,
      },
      deflate: {
        flush: require('zlib').constants.Z_SYNC_FLUSH,
      },
    })
  )
  // Serve static files located under `process.env.RAZZLE_PUBLIC_DIR`
  .use(
    serve(
      process.env.NODE_ENV === 'production'
        ? path.join(__dirname, '../build/public')
        : 'public',
      process.env.NODE_ENV === 'production'
        ? {
            maxage: 10 * 24 * 60 * 60 * 1000,
            immutable: true,
          }
        : {}
    )
  )
  .use(router.routes())
  .use(router.allowedMethods());

export default server;
