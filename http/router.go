package http

import (
	"net/http"

	"github.com/gorilla/mux"
)

const staticDir string = "/ui/build/"

// Bind routes to handlers and create a router
func NewRouter(api APIHandler) *mux.Router {
	router := mux.NewRouter().StrictSlash(true)

	for _, route := range getRoutes(api) {
		var handler http.Handler

		handler = route.HandlerFunc
		handler = Logger(handler, route.Name)

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}

	router.
		Path("/index.html").
		Handler(http.FileServer(http.Dir("." + staticDir + "index.html")))

	// router.
	// 	PathPrefix("/").
	// 	Handler(http.StripPrefix(staticDir, http.FileServer(http.Dir("."+staticDir))))

	return router
}
