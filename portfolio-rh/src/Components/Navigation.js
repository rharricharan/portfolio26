import { NavLink } from 'react-router-dom';
import './Styles/Navigation.css';

function Navigation() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <NavLink className="site-header__brand" to="/" end>
                    Ryan Harricharan
                </NavLink>
                <nav className="site-navigation" aria-label="Main navigation">
                    <NavLink
                        className={({ isActive }) =>
                            `site-navigation__link${isActive ? ' site-navigation__link--active' : ''}`
                        }
                        to="/"
                        end
                    >
                        About
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `site-navigation__link${isActive ? ' site-navigation__link--active' : ''}`
                        }
                        to="/"
                        end
                    >
                        Mail
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Navigation;