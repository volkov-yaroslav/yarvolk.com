import "@styles/components/header.css";

import siteConfig from "@config/site.config.json";
import { localeText, localizeBlogPath, localizePagePath, localizePortfolioPath } from "@lib/i18n";
import { useEffect, useMemo, useRef, useState } from "react";

const normalizePath = (value) => {
  if (!value) return "/";
  const normalized = value.replace(/\/+$/, "");
  return normalized || "/";
};

const isRootLikePath = (href) => href === "/" || /^\/(ua|pl)$/.test(href);

const isPathActive = (pathname, href) => {
  const currentPath = normalizePath(pathname);
  const targetPath = normalizePath(href);

  if (isRootLikePath(targetPath)) return currentPath === targetPath;
  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
};

const Header = ({ locale = "en" }) => {
  const text = localeText[locale];
  const { logo, logoText } = siteConfig;
  const mainMenu = useMemo(
    () => [
      { name: text.menu.home, link: localizePagePath(locale) },
      { name: text.menu.portfolio, link: localizePortfolioPath(locale) },
      { name: text.menu.blog, link: localizeBlogPath(locale) },
      { name: text.menu.about, link: localizePagePath(locale, "about") },
      { name: text.menu.contact, link: localizePagePath(locale, "contact") },
    ],
    [locale, text],
  );

  const [pathname, setPathname] = useState("");
  const [indicatorPosition, setIndicatorPosition] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavClosed, setMobileNavClosed] = useState(true);
  const [isInvisible, setIsInvisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const navRef = useRef(null);
  const activeLinkRef = useRef(null);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = navRef.current?.querySelector(".active");
      if (!activeLink) {
        setIndicatorPosition(null);
        return;
      }

      activeLinkRef.current = activeLink;
      setIndicatorPosition({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    };

    requestAnimationFrame(updateIndicator);
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [pathname, mainMenu]);

  useEffect(() => {
    const handleScroll = () => {
      const banner = document.querySelector(".banner");
      const bannerScrollHeight = (banner?.scrollHeight || 0) + 100;
      const currentScrollTop = document.documentElement.scrollTop;

      setIsScrolled(window.scrollY > 50);
      setIsActive(currentScrollTop > 0);
      setIsInvisible(currentScrollTop > bannerScrollHeight && currentScrollTop > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (mobileNavClosed) {
      html.classList.remove("overflow-hidden");
    } else {
      html.classList.add("overflow-hidden");
    }

    return () => html.classList.remove("overflow-hidden");
  }, [mobileNavClosed]);

  const handleLinkMouseEnter = (event) => {
    const link = event.currentTarget;
    setIndicatorPosition({
      left: link.offsetLeft,
      width: link.offsetWidth,
    });
  };

  const handleLinkMouseLeave = () => {
    if (!activeLinkRef.current) return;
    setIndicatorPosition({
      left: activeLinkRef.current.offsetLeft,
      width: activeLinkRef.current.offsetWidth,
    });
  };

  const handleLinkClick = (event) => {
    const link = event.currentTarget;
    activeLinkRef.current = link;
    setIndicatorPosition({
      left: link.offsetLeft,
      width: link.offsetWidth,
    });
    setPathname(link.getAttribute("href") || window.location.pathname);
    setMobileNavClosed(true);
  };

  const mobileMenuLength = mainMenu.length + 1;

  return (
    <header
      className={`fixed top-0 z-[9000] w-full header ${isActive ? "active" : ""} ${
        isInvisible ? "-translate-y-full" : ""
      }`}
    >
      <div className="container">
        <div className="flex justify-between py-6 items-center relative">
          <div
            className={`w-auto md:w-1/4 xl:w-auto transition-all duration-300 ${
              isScrolled ? "opacity-0 -translate-x-8 pointer-events-none" : "opacity-100 translate-x-0"
            }`}
          >
            <a href={localizePagePath(locale)} className="inline-block align-middle" onClick={handleLinkClick}>
              <img src={logo} alt={logoText} className="w-[190px] h-auto max-w-full" />
            </a>
          </div>

          <nav
            ref={navRef}
            className={`navbar xl:flex ${
              isActive ? "bg-dark/80" : "bg-dark/50"
            } backdrop-blur-[10px] xl:rounded-full rounded-[2rem] border border-white/10 px-2 xl:py-2 py-5 transition-all duration-500 xl:static xl:w-auto absolute right-0 top-6 z-30 max-w-full overflow-hidden ${
              mobileNavClosed ? "w-12 !h-12 xl:w-auto xl:!h-auto" : "w-56 xl:w-auto"
            } ${!mobileNavClosed ? "navbarOpen" : ""}`}
            style={{ height: mobileNavClosed ? "auto" : `${42 + mobileMenuLength * 40}px` }}
          >
            {indicatorPosition && (
              <span
                className="indicator absolute h-full left-0 top-0 hidden xl:block"
                style={indicatorPosition}
              ></span>
            )}

            {mainMenu.map((item) => (
              <a
                key={item.link}
                href={item.link}
                className={`py-3 px-[22px] leading-none relative z-20 block text-white hover:text-white/50 ${
                  !mobileNavClosed ? "opacity-100" : "opacity-0"
                } xl:opacity-100 xl:hover:text-white xl:whitespace-nowrap ${isPathActive(pathname, item.link) ? "active" : ""}`}
                onMouseEnter={handleLinkMouseEnter}
                onMouseLeave={handleLinkMouseLeave}
                onClick={handleLinkClick}
              >
                {item.name}
              </a>
            ))}

            <a
              href="https://buymeacoffee.com/yarvolk"
              target="_blank"
              rel="noopener noreferrer"
              className={`py-3 px-[22px] leading-none relative z-20 block text-white hover:text-white/50 xl:hidden ${
                !mobileNavClosed ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setMobileNavClosed(true)}
            >
              {text.menu.buyCoffee}
            </a>
          </nav>

          <div
            className={`fixed inset-0 bg-black/80 z-20 transition-all duration-500 ${
              mobileNavClosed
                ? "opacity-0 invisible pointer-events-none"
                : "opacity-100 visible pointer-events-auto"
            }`}
            onClick={() => setMobileNavClosed(true)}
          ></div>

          <button
            type="button"
            aria-label="Toggle Mobile Navigation"
            className={`cursor-pointer block xl:hidden w-12 h-12 border border-white/10 rounded-full p-1 relative z-40 overflow-hidden origin-bottom-left transition-transform duration-300 ${
              mobileNavClosed ? "" : "scale-[0.85]"
            }`}
            onClick={() => setMobileNavClosed((value) => !value)}
          >
            <svg
              className={`absolute top-[calc(50%_-_12px)] left-[calc(50%_-_12px)] transition-transform duration-300 ${
                mobileNavClosed ? "" : "-translate-x-[3rem]"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 8l16 0"></path>
              <path d="M4 16l16 0"></path>
            </svg>
            <svg
              className={`absolute top-[calc(50%_-_12px)] left-[calc(50%_-_12px)] transition-transform duration-300 ${
                mobileNavClosed ? "-rotate-180 translate-x-[3rem]" : "rotate-0 translate-x-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>

          <div
            className={`w-1/4 xl:w-auto transition-all duration-300 hidden xl:flex justify-end ${
              isScrolled ? "xl:opacity-0 xl:translate-x-8" : ""
            }`}
          >
            <div className={`${isActive ? "bg-dark/80" : "bg-dark/50"} backdrop-blur-[10px] rounded-full border border-white/10 px-2 xl:py-2`}>
              <a
                href="https://buymeacoffee.com/yarvolk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-[22px] py-3 leading-none whitespace-nowrap text-white hover:bg-white/10 hover:text-white transition-colors duration-300"
                aria-label={text.menu.buyCoffee}
              >
                <span aria-hidden="true">☕</span>
                <span>{text.menu.buyCoffee}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
