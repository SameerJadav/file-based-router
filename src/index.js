import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * @param { string } dir
 * @returns { Promise<Map<string, string> | undefined> }
 */
async function getRoutes(dir) {
  try {
    /** @type { Map<string,string> } */
    let routes = new Map();
    const contents = await fs.readdir(dir);
    for (const content of contents) {
      const fullpath = path.join(dir, content);
      const stats = await fs.stat(fullpath);
      if (stats.isDirectory()) {
        const subdir = await getRoutes(fullpath);
        if (!subdir) return;
        for (const [key, val] of subdir) {
          routes.set(key, val);
        }
      } else {
        if (!content.endsWith(".html")) continue;

        let route = fullpath.slice(fullpath.indexOf("pages") + "pages".length);
        route = route.replace(".html", "");
        if (route.endsWith("index")) {
          route = route.slice(0, -5);
          if (route.endsWith("/") && route !== "/") {
            route = route.slice(0, -1);
          }
        }

        routes.set(route, fullpath);
      }
    }
    return routes;
  } catch (error) {
    console.error("Error getting routes:", error);
  }
}

async function main() {
  try {
    const routes = await getRoutes(path.join(process.cwd(), "pages"));
    if (!routes) return;

    const server = http.createServer();
    const port = parseInt(process.env.PORT) || 8080;

    server.on("request", async (req, res) => {
      const fullpath = routes.get(req.url) || routes.get("/404");
      const status = routes.has(req.url) ? 200 : 404;

      res.writeHead(status, { "Content-Type": "text/html" });
      res.end(await fs.readFile(fullpath));

      console.log(`Request for ${req.url} - Status: ${status}`);
    });

    console.log(`Server running at http://localhost:${port}`);
    server.listen(port);
  } catch (error) {
    console.error(error);
  }
}

main();
