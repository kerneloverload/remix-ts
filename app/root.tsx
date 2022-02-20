import {LiveReload, Links, LinksFunction, Link, Outlet, ErrorBoundaryComponent, Meta, MetaFunction
} from "remix";
import globalStyleSheet from "~/styles/global.css"

export const links:LinksFunction = () => [{rel:"stylesheet", href:globalStyleSheet}];
export const meta:MetaFunction = () => {
  const keywords = ["React", "Remix", "JavaScript"];
  const description = ["A Blog with Remix TS"];
  return{
    keywords,
    description
  }
}
const App:React.FC = () => {
  return (
    <Document>
      <Layout>
        <Outlet />
        </Layout>
    </Document>
  )

}

const Document:React.FC = ({children}) => {
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Meta />
      <Links />
      <title>Remix Blog App</title>
    </head>
    <body>
      {children}
      {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
    </body>
    </html>
  )
}

const Layout:React.FC = ({children}) => {
    return(
      <>
      <nav className="navbar">
        <Link className="logo" to="/">REMIX</Link>
        <ul className="nav">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        {children}
      </div>
      </>
    )
}


export const ErrorBoundary:ErrorBoundaryComponent = ({error}) => {
  return(
    <Document>
    <Layout>
      <h1>Error</h1>
      <p>{error.message}</p>
      </Layout>
  </Document>
  )

}
export default App;