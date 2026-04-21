"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { StrapiImage } from "../StrapiImage";
import type { LinkProps, LogoProps } from "@/types";

interface HeaderProps {
  data: {
    logo: LogoProps;
    navigation: LinkProps[];
    cta: LinkProps;
  };
}

export function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const headerLight = pathname === "/experience";
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  if (!data) return null;

  const { logo, navigation, cta } = data;

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 380);
  };

  const handleToggle = () => (isOpen ? handleClose() : handleOpen());

  return (
    <header
      className={`header ${headerLight ? "header--light" : ""} ${isOpen ? "header--open" : ""}`}
    >
      <Link href="/">
        <StrapiImage
          src={logo.image.url}
          alt={logo.image.alternativeText || "No alternative text provided"}
          className={`header__logo header__logo--${
            headerLight && !isOpen ? "white" : "black"
          }`}
          width={120}
          height={120}
        />
      </Link>
      <ul className="header__nav">
        {navigation.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              target={item.isExternal ? "_blank" : "_self"}
            >
              <h5>{item.text}</h5>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        className="header__cta"
        href={cta.href}
        target={cta.isExternal ? "_blank" : "_self"}
      >
        <button className="btn btn--black btn--small">{cta.text}</button>
      </Link>
      <button
        className="header__hamburger"
        onClick={handleToggle}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>
      {(isOpen || isClosing) && (
        <div
          className={`header__mobile-nav${isClosing ? " header__mobile-nav--closing" : ""}`}
        >
          <ul>
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  target={item.isExternal ? "_blank" : "_self"}
                  onClick={handleClose}
                >
                  <h5>{item.text}</h5>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={cta.href} target={cta.isExternal ? "_blank" : "_self"}>
            <button className="btn btn--black btn--small">{cta.text}</button>
          </Link>
        </div>
      )}
    </header>
  );
}
