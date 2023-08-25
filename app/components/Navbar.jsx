import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./dojo-logo.png";

export default function Navbar() {
  return (
    <nav>
      {/* default for quality is normally 70/80.. blur makes it temporarily blur while it loads*/}
      <Image src={Logo} alt="dojo help desk logo" width={70} height={70} quality={100} placeholder="blur"/>
      <h1>Dojo HelpDesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
    </nav>
  );
}
