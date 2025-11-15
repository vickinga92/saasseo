document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    
    // Verificación de elementos (Buena práctica)
    if (!menuButton || !mobileMenu) {
        console.error("No se encontraron el botón o el menú móvil (menu-button o mobile-menu).");
        return;
    }

    const menuLinks = mobileMenu.querySelectorAll('a');
    const menuIcon = menuButton.querySelector('.icono-hamburguesa'); 
    const closeIcon = menuButton.querySelector('.icono-cerrar'); 

    // Verificación de iconos (Buena práctica)
    if (!menuIcon || !closeIcon) {
        console.error("No se encontraron los iconos de hamburguesa o cerrar.");
        // Continuamos, pero el toggle de iconos no funcionará.
    }

    /**
     * Alterna la visibilidad y el estado del menú móvil.
     */
    const toggleMenu = () => {
        // 1. Alterna la clase 'active' y obtiene el nuevo estado (true = abierto)
        const isExpanded = mobileMenu.classList.toggle('active');

        // 2. Sincronizar la clase 'hidden' para el estado inicial/final
        // Importante: mobileMenu debe tener 'hidden' en el HTML para empezar.
        mobileMenu.classList.toggle('hidden', !isExpanded); 
        
        // 3. Actualizar el atributo ARIA y la clase de scroll
        menuButton.setAttribute('aria-expanded', isExpanded);
        body.classList.toggle('menu-open', isExpanded);

        // 4. Alternar la visibilidad de los iconos (usando la lógica consistente)
        if (menuIcon && closeIcon) {
            menuIcon.classList.toggle('hidden', isExpanded);
            closeIcon.classList.toggle('hidden', !isExpanded);
        }
    };

    // 1. Toggle al hacer clic en el botón de hamburguesa
    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    // 2. Cerrar menú al hacer clic en un enlace interno
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Verificar si el menú está realmente abierto antes de intentar cerrarlo
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 3. Cerrar menú al hacer clic fuera de él
    document.body.addEventListener('click', (event) => {
        const isMenuOpen = mobileMenu.classList.contains('active');
        
        // El evento de clic en el botón ya tiene stopPropagation, 
        // pero este check es crucial para cerrar al hacer clic en el fondo.
        if (isMenuOpen && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
            toggleMenu();
        }
    });

    // 4. Cerrar menú si la ventana se redimensiona a tamaño de escritorio
    window.addEventListener('resize', () => {
        // Ajusta el valor 768px si tu breakpoint de escritorio es diferente
        if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// ENLACES DE AFILIADO!!!

const AFILIADOS = {

    // ===============================================
    // SILO 1: IA & AUTOMATIZACIÓN (Claves simplificadas)
    // ===============================================
    WRITESONIC: "https://writesonic.com/",
    COPY: "https://www.copy.ai/",
    JASPER: "https://www.jasper.ai/",
    RYTR: "https://rytr.me/",
    NEUROFLASH: "https://neuroflash.com/es/", // Simplificado
    SURFER: "https://surferseo.com/",     // Simplificado
    CLICKUP: "https://clickup.com/",          // Simplificado

    // Herramientas de Ventas/CRM/Automatización (Mantienen el sufijo por claridad/conflicto potencial)
    HUBSPOT: "https://www.hubspot.es/",
    ACTIVECAMPAIGN: "https://www.activecampaign.com/",
    APOLLO: "https://www.apollo.io/",
    GONG: "https://www.gong.io/",
    CLARI: "https://www.clari.com/",
    CHORUS: "https://www.zoominfo.com/", 
    DRIFT: "https://www.drift.com/",
    INTERCOM: "https://www.intercom.com/",

    // ===============================================
    // SILO 2: MONETIZACIÓN Y CREADORES (Claves simplificadas)
    // ===============================================
    KAJABI: "https://kajabi.com/",
    TEACHABLE: "https://www.teachable.com/",
    THINKIFIC: "https://www.thinkific.com/",
    KIT: "https://kit.com/", 
    CIRCLE: "https://circle.so/",
    MIGHTY: "https://www.mightynetworks.com/", // Simplificado
    SUBSTACK: "https://substack.com/home-i",

    // ===============================================
    // SILO 3: NEGOCIOS & SEGURIDAD (Claves simplificadas)
    // ===============================================
    ASANA: "https://asana.com/es/",
    MONDAY: "https://monday.com/lang/es/",
    ONEPASSWORD: "https://1password.com/",
    LASTPASS: "https://www.lastpass.com/es/",
    BITWARDEN: "https://bitwarden.com/",
    NORDVPN: "https://nordvpn.com/es/",
    EXPRESSVPN: "https://www.expressvpn.com/",
    ZOHO: "https://www.zoho.com/",
    PIPEDRIVE: "https://www.pipedrive.com/es-es",

    // ===============================================
    // SILO 4: MARKETING DIGITAL & SEO (Claves simplificadas)
    // ===============================================
    SUPERMETRICS: "https://supermetrics.com/",
    COUPLER: "https://www.coupler.io/",
    SEMRUSH: "https://www.semrush.com/",
    AHREFS: "https://ahrefs.com/",
    SERANKING: "https://seranking.com/",
    MOZ: "https://moz.com/",
    SPYFU: "https://www.spyfu.com/",
    CLEARSCOPE: "https://www.clearscope.io/",
    KWFINDER: "https://mangools.com/kwfinder/",
    DASHTHIS: "https://dashthis.com/",
    FUNNEL: "https://funnel.io/",
    DATABOX: "https://databox.com/",
    LOOKERSTUDIO: "https://lookerstudio.google.com/",

};

// assets/js/main.js

const setAllAffiliateLinks = () => {
    // Definimos los prefijos de ID que indican un enlace de afiliado/CTA.
    const prefixes = ['link-', 'aff-']; 

    // Itera sobre todos los enlaces de la página
    document.querySelectorAll('a').forEach(anchor => {
        const anchorId = anchor.id;

        // 1. Verifica si el enlace tiene un ID y si ese ID comienza con el prefijo.
        if (anchorId && prefixes.some(p => anchorId.startsWith(p))) {
            
            // 2. Intentamos identificar la clave de la herramienta a partir del ID.
            const toolKeys = Object.keys(AFILIADOS);
            let foundToolKey = null;

            // Iteramos sobre las claves de AFILIADOS.
            for (const fullKey of toolKeys) {
                
                // Convertimos la clave de AFILIADOS (ej: 'JASPER') a minúsculas y reemplazamos '_' por '-'
                // La clave HTML es en minúsculas y usa guiones (ej: 'jasper-ai').
                const keyToMatch = fullKey.toLowerCase().replace(/_/g, '-');
                
                // 3. Comparamos si el ID del HTML incluye el nombre estandarizado de la herramienta.
                if (anchorId.includes(keyToMatch)) {
                    foundToolKey = fullKey; // Usamos la clave COMPLETA (ej: JASPER) para el lookup.
                    break;
                }
            }
            
            // 4. Si encontramos la clave, inyectamos la URL.
            if (foundToolKey) {
                anchor.href = AFILIADOS[foundToolKey];
            }
        }
    });
};

// Llama a la función al cargar el DOM
document.addEventListener('DOMContentLoaded', setAllAffiliateLinks);

/**
 * Lógica para la gestión de consentimiento de cookies (RGPD/LSSI-CE).
 * Integrado en main.js según solicitud.
 */

document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');
    const cookieName = 'cookieConsent'; // Nombre de la cookie de consentimiento

    // 1. FUNCIÓN PARA ESTABLECER LA COOKIE
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        // Path='/' asegura que la cookie esté disponible en todo el sitio.
        // secure y samesite=Lax son buenas prácticas de seguridad.
        document.cookie = name + "=" + (value || "")  + expires + "; path=/; secure; samesite=Lax";
    }

    // 2. FUNCIÓN PARA LEER LA COOKIE
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // 3. COMPROBAR CONSENTIMIENTO AL CARGAR
    const consent = getCookie(cookieName);
    
    // Si no hay consentimiento, mostramos el banner
    if (!consent) {
        // Usamos 'flex' porque el CSS usa flexbox
        if (banner) { 
            banner.style.display = 'flex'; 
        }
    } else {
        // Si ya hay consentimiento, el banner permanece oculto
        if (banner) {
            banner.style.display = 'none';
        }
        
        // Carga de scripts de terceros si se ha aceptado
        if (consent === 'accepted') {
             // Aquí irían las llamadas para cargar Google Analytics, Google Ads, etc.
             // (Ej: ga('send', 'pageview'); o funciones de inicialización de píxeles)
        }
    }

    // 4. MANEJADORES DE EVENTOS
    
    if (acceptButton) {
        // Aceptar Cookies
        acceptButton.addEventListener('click', () => {
            setCookie(cookieName, 'accepted', 365); // Guarda la aceptación por un año
            if (banner) banner.style.display = 'none';
            // Vuelve a cargar los scripts de terceros inmediatamente
        });
    }

    if (rejectButton) {
        // Rechazar Cookies
        rejectButton.addEventListener('click', () => {
            setCookie(cookieName, 'rejected', 365); // Guarda el rechazo
            if (banner) banner.style.display = 'none';
            // NO carga los scripts de terceros
        });
    }

    // IMPORTANTE: Recuerda que CUALQUIER script de seguimiento (Google Analytics, 
    // píxeles, etc.) DEBE estar bloqueado por defecto y solo cargarse si 
    // 'consent' es 'accepted'. Esto requiere más lógica de programación.
});