import { notFound } from "next/navigation"
import React from "react";

// if it lands on some weird page maybe because the id is wrong, it will return a 404
export const dynamicParams = true;

// purpose of this function is to get all the ids, and all tickets at build time
// so that nextjs can make a page and cooresponding routes
// must return an array of objects where each one repressents a route
export async function generateStaticParams() {
  // [{id:1},{id:2} ...] kind of like this
  const res = await fetch("http://localhost:4000/tickets");

  const tickets = await res.json();

  return tickets.map((ticket) => ({
    id: ticket.id,
  }));
}

async function getTicket(id) {
  const res = await fetch("http://localhost:4000/tickets/" + id, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound()
  }

  return res.json();
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created By: {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>{ticket.priority}</div>
      </div>
    </main>
  );
}
