"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navigation() {
    const path = usePathname();
    console.log(path);
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link> { path === "/" ? "Lit" : ""}
                </li>
                <li>
                    <Link href="/about-us">About</Link> { path === "/about-us" ? "Lit" : ""}
                </li>
            </ul>
        </nav>
    )
}