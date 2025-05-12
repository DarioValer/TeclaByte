async function cargarSeccion(id, urlHTML) {
  const contenedor = document.getElementById(id);
  if (!contenedor) return;

  try {
    // Cargar e insertar HTML
    const respuesta = await fetch(urlHTML);
    const html = await respuesta.text();
    contenedor.innerHTML = html;

    const base = urlHTML.replace('.html', '');

    // === Cargar CSS ===
    const cssURL = `${base}.css`;
    const respCSS = await fetch(cssURL);
    if (respCSS.ok && !document.querySelector(`link[href="${cssURL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssURL;
      document.head.appendChild(link);
    }

    // === Cargar JS ===
    const jsURL = `${base}.js`;
    const respJS = await fetch(jsURL);
    if (respJS.ok && !document.querySelector(`script[src="${jsURL}"]`)) {
      const script = document.createElement('script');
      script.src = jsURL;
      script.defer = true;
      document.body.appendChild(script);
    }

    // === Ajustar altura si el ID empieza con "nav" ===
    if (id.startsWith("nav")) {
      requestAnimationFrame(() => {
        const nav = contenedor.querySelector('nav');
        if (nav) {
          contenedor.style.height = `${nav.offsetHeight}px`;
        }
      });
    }


  } catch (err) {
    console.error(`Error al cargar ${urlHTML}:`, err);
  }
}

  
  // Ejemplo de uso:
  cargarSeccion("nav-placeholder", "../navBars/nav2/nav2.html");
  cargarSeccion("nav-mobile-placeholder", "navMobile.html");
  cargarSeccion("footer-placeholder", "../footers/footer9/footer9.html");
  