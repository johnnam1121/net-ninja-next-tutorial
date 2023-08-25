import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">We hit a brick wall.</h2>
      <p>We could not find the ticket you were looking for</p>
      <p>
        Go back to the <Link href="/">Tickets</Link>
      </p>
    </main>
  );
}
