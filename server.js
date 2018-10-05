const express = require("express");
const dev = process.env.NODE_ENV !== "production";
const next = require("next");
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    /* Pages follow the following format from the .helpers/route_types file
      server.get(`${pattern}/:${id_type}`, (req, res) => {
        const nextJsPage = `/${page}`;
        const queryParams = { id_type: req.params.id_type };
        app.render(req, res, nextJsPage, queryParams);
      });
    */

    server.get("/blog/:slug", (req, res) => {
      const nextJsPage = "/blogPost";
      const queryParams = { slug: req.params.slug };
      app.render(req, res, nextJsPage, queryParams);
    });

    server.get("*", (req, res) => handle(req, res));

    const port = process.env.PORT || 3000;

    server.listen(port, err => {
      if (err) throw err;
      console.log(`>Ready http://localhost:${port}...`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
