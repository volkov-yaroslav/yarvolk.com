import '@styles/components/header.css';

import menu from '@config/menus.json';
import siteConfig from '@config/site.config.json';
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const { logo, logoText, socialLinks } = siteConfig;
  const { mainMenu } = menu;
  const mainMenuLength = mainMenu.length;

  const [indicatorPosition, setIndicatorPosition] = useState(null);
  const navRef = useRef(null);
  const activeLinkRef = useRef(null);

  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = navRef.current?.querySelector('.active');
      if (activeLink) {
        activeLinkRef.current = activeLink;
        setIndicatorPosition({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
        });
      }
    };
    requestAnimationFrame(updateIndicator);
  }, []);

  const handleLinkMouseEnter = (event) => {
    const link = event.currentTarget;
    setIndicatorPosition({
      left: link.offsetLeft,
      width: link.offsetWidth,
    });
  };

  const handleLinkMouseLeave = () => {
    if (activeLinkRef.current) {
      setIndicatorPosition({
        left: activeLinkRef.current.offsetLeft,
        width: activeLinkRef.current.offsetWidth,
      });
    }
  };

  const handleLinkClick = (event) => {
    const link = event.currentTarget;
    activeLinkRef.current = link;
    setIndicatorPosition({
      left: link.offsetLeft === 0 ? link.offsetLeft + 8 : link.offsetLeft,
      width: link.offsetLeft === 0 ? link.offsetWidth + 7 : link.offsetWidth,
    });
    setPathname(window.location.pathname);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [mobileNavClose, setMobileNavClose] = useState(true);
  useEffect(() => {
    const html = document.documentElement;
    mobileNavClose 
      ? html.classList.remove("overflow-hidden") 
      : html.classList.add("overflow-hidden");
  }, [mobileNavClose]);

  const [isInvisible, setIsInvisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const banner = document.querySelector(".banner");
    const bannerScrollHeight = banner?.scrollHeight + 100;
    const observer = new IntersectionObserver(
      (entry) => {
        window.addEventListener("scroll",
          () => entry[0].isIntersecting ? setIsActive(false) : setIsActive(true)
        );

        let lastScrollTop = 0;
        const handleScroll = () => {
          const currentScrollTop = document.documentElement.scrollTop;
          if (currentScrollTop > bannerScrollHeight && currentScrollTop > lastScrollTop) {
            setIsInvisible(true);
          } else {
            setIsInvisible(false);
          }
          lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      },
      { threshold: [0] }
    );
    banner && observer.observe(banner);
    return () => banner && observer.unobserve(banner);
  }, []);

  return (
    <header 
      className={`fixed top-0 z-[9000] w-full header ${isActive ? "active" : ""} ${isInvisible ? "-translate-y-full" : ""}`}
    >
      <div className="container">
        <div className="flex justify-between py-6 items-center relative">
          <div className={`w-1/4 transition-all duration-300 ${isScrolled ? "lg:opacity-0 lg:-translate-x-8" : ""}`}>
            <a
              href="/" 
              className="inline-block align-middle"
              onClick={handleLinkClick}
            >
              <img
                src={logo}
                alt={logoText}
                width="80"
                height="29"
              />
            </a>
          </div>
          {/*  */}
          <nav
            ref={navRef}
            className={`navbar lg:flex ${isActive ? "bg-dark/80" : "bg-dark/50"} backdrop-blur-[10px] lg:rounded-full rounded-3xl px-2 lg:py-2 py-5 border border-white/10 duration-500 lg:static lg:w-auto absolute right-0 top-6 z-30 max-w-full overflow-hidden ${mobileNavClose ? "w-12 !h-12 lg:w-auto lg:!h-auto" : "w-56 lg:w-auto"} ${!mobileNavClose ? "navbarOpen" : ""}`}
            style={{ height: mobileNavClose ? "auto" : 42 + (mainMenuLength * 40) + "px" }}
          >
            {indicatorPosition && (
              <span
                className="indicator absolute h-full w-full left-0 top-0 hidden lg:block"
                style={indicatorPosition}
              ></span>
            )}

            {mainMenu.map((item, key) => (
              <a
                key={key}
                href={item.link}
                className={`py-3 px-[22px] leading-none relative z-20 block text-white hover:text-white/50 hover:lg:text-white ${!mobileNavClose ? "opacity-100" : "opacity-0"} lg:opacity-100 ${
                  pathname === item.link
                    || pathname.includes("/blog") && item.link === "/blog"
                    || pathname.includes("/project") && item.link === "/project"
                    ? "active" : ""
                }`}
                onMouseEnter={handleLinkMouseEnter}
                onMouseLeave={handleLinkMouseLeave}
                onClick={handleLinkClick}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div
            className={`fixed inset-0 bg-black/80 z-20 transition-all duration-500 ${mobileNavClose ? "opacity-0 invisible" : "opacity-100 visible"}`}
            onClick={() => setMobileNavClose(true)}
          ></div>

          <button
            type="button"
            aria-label="Toggle Mobile Navigation"
            className={`cursor-pointer block lg:hidden w-12 h-12 border border-white/10 rounded-full p-1 relative z-40 overflow-hidden origin-bottom-left transition-transform duration-300 ${mobileNavClose ? "" : "scale-[0.85]"}`}
            onClick={() => setMobileNavClose(!mobileNavClose)}
          >
            <svg className={`absolute top-[calc(50%_-_12px)] left-[calc(50%_-_12px)] transition-transform duration-300 ${mobileNavClose ? "" : "-translate-x-[3rem]"}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 8l16 0"></path>
              <path d="M4 16l16 0"></path>
            </svg>
            <svg className={`absolute top-[calc(50%_-_12px)] left-[calc(50%_-_12px)] transition-transform duration-300 ${mobileNavClose ? "-rotate-180 translate-x-[3rem]" : "rotate-0 translate-x-0"}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>

          <div className={`w-1/4 transition-all duration-300 text-right text-sm hidden lg:block ${isScrolled ? "lg:opacity-0 lg:translate-x-8" : ""}`}>
            <span className="block text-white/75 mb-1">Social Links:</span>
            <ul className="inline-flex gap-x-4">
              {socialLinks.map((item, key) => (
                <li key={key} className="inline-block hover:opacity-75 transition-op duration-300">
                  <a href={item.link} className="link">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;