import Link from "next/link";
import React from "react";

async function getTickets() {
  // imitate a 3 second delay when loading the tickets page to see the loading screen for 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      // this is neat. basically tells next how often to recheck/refetch the data..
      // example, if I put 30, itll refetch the data every 30 seconds. If I open the page before 30 seconds,
      // it will stay the same, however if I check after 30 seconds, it will refresh the data
      // for the sake of this application which is a helpdesk, it will be set to 0 because there might
      // be tickets put in VERY often. this will be a bit less efficient however because it will
      // revalidate every page visit
      revalidate: 0,
    },
  });

  // this returns a promise
  return res.json();
}

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          {/* this link is how we dynamically pull up each ticket by combining it with the [id] dynamic page */}
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>{ticket.priority}</div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets</p>
      )}
    </>
  );
}
