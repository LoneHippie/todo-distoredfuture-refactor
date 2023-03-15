# Big ol' refactor

## General architecture changes

-  Changed all files that return a React JSX Element to `.jsx`. This becomes more useful with Typescript when you can use `.ts` vs `.tsx` which will let the compiler know if the file needs to have the line `import React from 'react'` included to compile JSX code.

-  Split files into several sections: components (for components), contexts which in React architecture is a good place to put providers that can wrap `App.jsx` like themes and routers, or API classes/functions, and views for each page

-  Moved api keys and other private strings to a `.env` file so they won't be commited and visible in public repositories. You can add these env values back in services like Netlify in the website options (eg. `REACT_APP_FIREBASE_API_KEY = "my totally secret key"`) so you can keep sensitive strings hidden

## Component level changes

-  Moved component logic into hooks within the same directories as the components themselves, then exported the components through a index file in that directory. This lets you put your component, styling and logic (via a custom hook) in a dir under the component name, then import directly from the folder itself since the index file default exports the component.

-  In general, unless you have a very small amount of logic going on in a component (like a setState for a boolean or two) you should try to extract that logic into a hook to be used in that component. Same if you have a lot of styling that could take up lots of space in the file.

-  Destructured props (`const Component = (props) => {}` to `const Component = ({prop1, prop2, prop3, etc}) => {}`). This pattern makes it much easier to keep track of which props each component has access to and is a recommended pattern when using Typescript with React. In general you should avoid accessing props through `props.propName`

## Bonus thing

-  Also added a `.prettierrc` file. Super useful for keeping code organized, auto formats everything on save based on what options you pass to the config, not only necessary for working with teams to keep code style consistent but really helps prevent confusion on HTML/element nesting
