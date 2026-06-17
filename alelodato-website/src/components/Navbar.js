"use client";

export default function Navbar() {
    return (
        <nav>
            <a href="#home" className="nav-logo">
                Alessio Lodato<sup>®</sup>
            </a>
            <div className="nav-right">
                <ul className="nav-links">
                    <li>
                        <a href="#chi-sono" data-cursor>
                            Chi sono
                        </a>
                    </li>
                    <li>
                        <a href="#cosa-faccio" data-cursor>
                            Servizi
                        </a>
                    </li>
                    <li>
                        <a href="#come-lavoro" data-cursor>
                            Processo
                        </a>
                    </li>
                    <li>
                        <a href="#progetti" data-cursor>
                            Progetti
                        </a>
                    </li>
                    <li>
                        <a href="#contatti" data-cursor>
                            Contatti
                        </a>
                    </li>
                </ul>
                <div className="nav-time">ROMA</div>
            </div>
        </nav>
    );
}
