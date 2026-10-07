import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import './Styles/ProjectNav.css';

const MOBILE_QUERY = '(max-width: 760px)';

const defaultItems = [
    { label: 'Smartstop', shortLabel: 'S', to: '/smartstop', end: true },
    { label: 'Shift AI' , shortLabel: 'S', to: '/shift-ai', end: true },
];

function ProjectNav({ items = defaultItems }) {
    const navRef = useRef(null);
    const backdropRef = useRef(null);
    const linksRef = useRef(null);
    const activeIndicatorRef = useRef(null);
    const hasPositionedIndicatorRef = useRef(false);
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(() =>
        window.matchMedia(MOBILE_QUERY).matches
    );
    const [isMinimized, setIsMinimized] = useState(() =>
        window.matchMedia(MOBILE_QUERY).matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(MOBILE_QUERY);
        const handleBreakpointChange = () => {
            setIsMobile(mediaQuery.matches);
            setIsMinimized(mediaQuery.matches);
        };

        mediaQuery.addEventListener('change', handleBreakpointChange);
        return () => mediaQuery.removeEventListener('change', handleBreakpointChange);
    }, []);

    useLayoutEffect(() => {
        const nav = navRef.current;
        if (!nav) return undefined;

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        const duration = prefersReducedMotion ? 0 : 0.38;
        const timeline = gsap.timeline();

        timeline.to(
            nav,
            {
                xPercent: isMobile && isMinimized ? -100 : 0,
                ...(isMobile ? {} : { width: isMinimized ? 76 : 248 }),
                duration,
                ease: 'power3.inOut',
                overwrite: 'auto',
            },
            0
        );

        if (isMobile && backdropRef.current) {
            timeline.to(
                backdropRef.current,
                {
                    autoAlpha: isMinimized ? 0 : 1,
                    duration: prefersReducedMotion ? 0 : 0.26,
                    ease: 'power2.out',
                    overwrite: 'auto',
                },
                0
            );
        } else if (!isMobile) {
            const fullLabels = nav.querySelectorAll(
                '.project-nav__brand-full, .project-nav__label'
            );
            const shortLabels = nav.querySelectorAll(
                '.project-nav__brand-short, .project-nav__short-label'
            );

            timeline.to(
                fullLabels,
                {
                    autoAlpha: isMinimized ? 0 : 1,
                    x: isMinimized ? -8 : 0,
                    duration: prefersReducedMotion ? 0 : 0.22,
                    stagger: prefersReducedMotion ? 0 : 0.025,
                    ease: 'power2.out',
                    overwrite: 'auto',
                },
                0
            );
            timeline.to(
                shortLabels,
                {
                    autoAlpha: isMinimized ? 1 : 0,
                    x: isMinimized ? 0 : -4,
                    duration: prefersReducedMotion ? 0 : 0.22,
                    stagger: prefersReducedMotion ? 0 : 0.025,
                    ease: 'power2.out',
                    overwrite: 'auto',
                },
                0
            );
        }

        return () => timeline.kill();
    }, [isMobile, isMinimized]);

    useLayoutEffect(() => {
        const links = linksRef.current;
        const indicator = activeIndicatorRef.current;
        const activeLink = links?.querySelector('.project-nav__link[aria-current="page"]');

        if (!indicator || !activeLink) return undefined;

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        const position = {
            y: activeLink.offsetTop,
            height: activeLink.offsetHeight,
            autoAlpha: 1,
        };

        if (!hasPositionedIndicatorRef.current || prefersReducedMotion) {
            gsap.set(indicator, position);
            hasPositionedIndicatorRef.current = true;
            return undefined;
        }

        const tween = gsap.to(indicator, {
            ...position,
            duration: 0.46,
            ease: 'power3.inOut',
            overwrite: 'auto',
        });

        return () => tween.kill();
    }, [items, isMinimized, isMobile, location.pathname]);

    const layoutClassName = [
        'project-layout',
        isMinimized && 'project-layout--minimized',
        isMobile && 'project-layout--mobile',
        isMobile && !isMinimized && 'project-layout--menu-open',
    ]
        .filter(Boolean)
        .join(' ');

    const closeMobileMenu = () => {
        if (isMobile) setIsMinimized(true);
    };

    return (
        <div className={layoutClassName}>
            {isMobile && (
                <button
                    ref={backdropRef}
                    className="project-nav__backdrop"
                    type="button"
                    aria-label="Close navigation menu"
                    aria-hidden={isMinimized}
                    tabIndex={isMinimized ? -1 : 0}
                    onClick={closeMobileMenu}
                />
            )}

            <aside ref={navRef} className="project-nav" aria-label="Sidebar navigation">
                <div className="project-nav__header">
                    <NavLink
                        className="project-nav__brand"
                        to="/"
                        aria-label="Ryan Harricharan home"
                        onClick={closeMobileMenu}
                    >
                        <span className="project-nav__brand-short" aria-hidden="true">RH</span>
                        <span className="project-nav__brand-full">Ryan Harricharan</span>
                    </NavLink>
                    {!isMobile && (
                        <button
                            className="project-nav__collapse"
                            type="button"
                            aria-label={isMinimized ? 'Expand sidebar' : 'Minimize sidebar'}
                            title={isMinimized ? 'Expand sidebar' : 'Minimize sidebar'}
                            onClick={() => setIsMinimized((minimized) => !minimized)}
                        >
                            <span className="project-nav__chevron" aria-hidden="true" />
                        </button>
                    )}
                </div>

                <nav ref={linksRef} className="project-nav__links" aria-label="Primary navigation">
                    <span
                        ref={activeIndicatorRef}
                        className="project-nav__active-indicator"
                        aria-hidden="true"
                    />
                    {items.map((item) => (
                        <NavLink
                            key={item.to}
                            className={({ isActive }) =>
                                `project-nav__link${isActive ? ' project-nav__link--active' : ''}`
                            }
                            to={item.to}
                            end={item.end || false}
                            aria-label={item.label}
                            title={isMinimized ? item.label : undefined}
                            onClick={closeMobileMenu}
                        >
                            <span className="project-nav__short-label" aria-hidden="true">
                                {item.shortLabel || item.label.slice(0, 1)}
                            </span>
                            <span className="project-nav__label">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {isMobile && (
                <button
                    className="project-nav__mobile-toggle"
                    type="button"
                    aria-expanded={!isMinimized}
                    aria-label={isMinimized ? 'Open navigation menu' : 'Close navigation menu'}
                    onClick={() => setIsMinimized((minimized) => !minimized)}
                >
                    {isMinimized ? 'RH' : 'Close'}
                </button>
            )}

            <div className="project-layout__content">
                <Outlet />
            </div>
        </div>
    );
}

export default ProjectNav;