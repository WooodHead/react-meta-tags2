# react-meta-tags2

https://github.com/aliozinan/react-meta-tags

## react-meta-tags (React.js v17 compatible version)
This is the React.js v17 compatible version of the react-meta-tags package. It also includes the awaiting PRs. Please check out the original documentation here.

WARNING : Use at your own risk.

This forked repo is a temporary solution to resolve the React v17.x compatibility and dependency vulnerability issues with the original library, until it's updated.

To add it to your project, add the following line to your package.json file in the dependencies section

"react-meta-tags": "git+https://github.com/aliozinan/react-meta-tags#master",

Notes:

If you're the owner of the original library, please don't hesitate to contact
Using yarn instead of npm is recommended.
Contributions are always welcome.

## Introduce
Handle document meta/head tags in isomorphic react with ease.

Handling title and meta/head tags in a isomporhic react is tricky. Its declarative to define those tags within the component, but they need to be moved on document head on client side as well as server side. While there are other modules which helps with the use-case like <a href="https://github.com/nfl/react-helmet" target="_blank">react-helmet</a> and  <a href="https://github.com/kodyl/react-document-meta" target="_blank">react-document-meta</a>, but they require to define those tags in a object literal. react-meta-tags allow you to write those tags in a declarative way and in normal jsx format.

### Install
Through npm
`npm install react-meta-tags2 --save`

Or get compiled development and production version from ./dist

### Usage

#### Using MetaTag Component

```jsx
import React from 'react';
import MetaTags from 'react-meta-tags2';

class Component1 extends React.Component {
  render() {
    return (
        <div className="wrapper">
          <MetaTags>
            <title>Page 1</title>
            <meta name="description" content="Some description." />
            <meta property="og:title" content="MyApp" />
            <meta property="og:image" content="path/to/image.jpg" />
          </MetaTags>
          <div className="content"> Some Content </div>
        </div>
      )
  }
}
```
Note : Define id on tags so if you navigate to other page, older meta tags will be removed and replaced by new ones.


#### ReactTitle Component
If you just want to add title on a page you can use ReactTitle instead.
```jsx
import React from 'react';
import {ReactTitle} from 'react-meta-tags2';

class Component2 extends React.Component {
  render() {
    return (
        <div className="wrapper">
          <ReactTitle title="Page 2"/>
          <div className="content"> Some Content </div>
        </div>
      )
  }
}
```

### Server Usage Example

```jsx
import MetaTagsServer from 'react-meta-tags/server';
import {MetaTagsContext} from 'react-meta-tags2';
/** Import other required modules **/

/*
------
  some serve specific code
------
*/

app.use((req, res) => {
  //make sure you get a new metatags instance for each request
  const metaTagsInstance = MetaTagsServer();

  //react router match
  match({
    routes, location: req.url
  }, (error, redirectLocation, renderProps) => {
    let reactString;

    try{
      reactString = ReactDomServer.renderToString(
      <Provider store={store}> {/*** If you are using redux ***/}
      {/* You have to pass extract method through MetaTagsContext so it can catch meta tags */}
        <MetaTagsContext extract = {metaTagsInstance.extract}>
          <RouterContext {...renderProps}/>
        </MetaTagsContext>
      </Provider>
      );
    }
    catch(e){
      res.status(500).send(e.stack);
      return;
    }

    //get all title and metatags as string
    const meta = metaTagsInstance.renderToString();

    //append metatag string to your layout
    const htmlStr = (`
      <!doctype html>
      <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          ${meta}
        </head>
        <body>
          <div id="content">
            ${reactString}
          </div>
        </body>
      </html>  
    `);

    res.status(200).send(layout);
  });
});
```

So as per above code we have to do following for server rendering

1. Import MetaTagsServer and MetaTagsContext
2. Create a new instance of MetaTagsServer
3. Wrap your component inside MetaTagsContext and pass extract method as props
4. Extract meta string using renderToString of MetaTagsServer instance
5. Append meta string to your html template.

#### JSX Layout
You might also be using React to define your layout, in which case you can use `getTags` method from `metaTagsInstance`. The layout part of above server side example will look like this.
```jsx
//get all title and metatags as React elements
const metaTags = metaTagsInstance.getTags();

//append metatag string to your layout
const layout = (
  <html lang="en-us">
    <head>
      <meta charSet="utf-8"/>
      {metaTags}
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{__html: reactString}} />
    </body>
  </html>  
);

const htmlStr = ReactDomServer.renderToString(layout);

res.status(200).send(htmlStr);
```



## Meta Tag Uniqueness
- The module uniquely identifies meta tag by id / property / name / itemProp attribute.
- Multiple meta tags with same property / name is valid in html. If you need such case. Define a different id to both so that it can be uniquely differentiate.
- You should give an id if meta key is different then property/name/itemProp to uniquely identify them.
