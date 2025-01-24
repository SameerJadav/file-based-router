# File-Based Router Project

A simple file-based router built using Node.js. It generates routes based on the `pages` directory's file structure. It then serves the corresponding HTML files. The server maps URLs to file paths to handle requests. It serves the appropriate content, including a custom 404 page if the route is not found.

## Features

- **File-System Based Router**: It generates routes based on the `pages` directory's file structure.

- **Custom 404 Page**: Serves a custom 404 page if the requested route is not found.

- **Simple Configuration**: Easy to set up and run with minimal configuration.

## Customization

- **Adding New Routes**: Simply add new HTML files to the `pages` directory. The router will pick them up on its own.

- **Custom 404 Page**: Change the `pages/404.html` file to customize your 404 page.

## Example

Here’s an example of how your `pages` directory might look:

```tree
pages
├── index.html -> mysite.com
├── about.html -> mysite.com/about
├── settings
│   ├── index.html -> mysite.com/settings
│   ├── profile.html -> mysite.com/settings/profile
│   └── notifications.html -> mysite.com/settings/notifications
└── 404.html -> mysite.com/this-page-does-not-exist
```

## Code Overview

The main logic is contained in the `main.js` file:

- **`getRoutes(dir)`**: Recursively scans the `pages` directory and builds a map of routes to file paths.

- **`main()`**: Starts the HTTP server, listens for requests, and serves the appropriate HTML file based on the route.
