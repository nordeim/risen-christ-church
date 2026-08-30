export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(event) => {
        // Under HashRouter the hash IS the route — a native jump to
        // #main-content would rewrite the URL and render NotFound.
        event.preventDefault();
        const main = document.getElementById("main-content");
        if (!main) return;
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: false });
        main.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      Skip to main content
    </a>
  );
}
