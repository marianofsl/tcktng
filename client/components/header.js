import Link from 'next/link'

export default ({ currentUser }) => {
    const links = [
        !currentUser && { label: 'Sign up', href: '/signup' },
        !currentUser && { label: 'Sign in', href: '/signin' },
        currentUser && { label: 'Sign out', href: '/signout' }
    ]
        .filter(link => link)
        .map((link) => <li key={link.href} className="nav-item">
            <Link href={link.href}>
                <a className="nav-link">
                    {link.label}
                </a>
            </Link>
        </li>)

    return <nav className="navbar navbar-light bg-light">
        <Link href="/">
            <a className="navbar-brand">Tcktng</a>
        </Link>

        <div className="d-flex justify-content-end">
            <ul className="nav d-flex align-items-center">
                {links}
            </ul>
        </div>
    </nav>
}