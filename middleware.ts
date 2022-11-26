import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // comprobamos la ruta en la cual se va a ejecutar antes el middleware
  if (req.nextUrl.pathname.startsWith("/api/entries/")) {
    // extraemos el id de la ruta para comprobarlo usando el metodo .replace() propio de js. Practicamente lo estamos cortando y
    // dejando solo el id limpio.
    const id = req.nextUrl.pathname.replace("/api/entries/", "");
    // usamos una regex para comprobarlo. También se puede usar un método propio de mongoose para comprobarlo
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    // si no es un id valido, clonamos la url, le asignamos una nueva url (para redirecionar a ese endpoint), también le agregamos
    // el id de la req a la url y finalmente la sobre escribimos (rewrite()) y la devolvemos.
    if (!checkMongoIDRegExp.test(id)) {
      const url = req.nextUrl.clone();
      url.pathname = "/api/bad-request";
      url.search = `?message=${id} is not a valid MongoID`;

      return NextResponse.rewrite(url);
    }
  }

  //   de lo contrario pasa a la siguiente ruta.
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/entries/:path*"],
};
