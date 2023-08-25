Lesson 1
Intro to next js
SSR vs client side rendering and benefits

Lesson 2
SSR vs client side rendering and benefits

Lesson 3
How to do page routes

Lesson 4
understanding layout schema.. was helpful! Edit layout because it is what wraps each page

Lesson 5
adding font and styles.. must go over tailwind css more on my own

Lesson 6
setting up a local server and fetching the data
json.server is the tool used to deploy server locally on port 4000

    <div className={`pill ${ticket.priority}`}>{ticket.priority}</div>
this is a dynamic class so we must use {``} this makes it so that depending on what the 'priority' level is, the class should change between pill.low pill.med pill.high

Next is good here because if any other component were to fetch the data, it won't have to redo the fetch because it gets cached. good for loading and overall website experience
 const res = await fetch("http://localhost:4000/tickets", {
    next: {
      // this is neat. basically tells next how often to recheck/refetch the data..
      // example, if I put 30, itll refetch the data every 30 seconds. If I open the page before 30 seconds,
      // it will stay the same, however if I check after 30 seconds, it will refresh the data
      revalidate: 0,
    },
  });

// Lesson 7
dynamic segments aka route parameter
ex: localhost:3000/tickets/12
this is for the ticket with id 12

wrap the name of the folder in [] which makes it dynamic
[id] is what we are calling it
Link href={`/tickets/${ticket.id}`}>

async function getTicket(id) {
  const res = await fetch("http://localhost:4000/tickets/" + id, {
    next: {
      revalidate: 60,
    },
  });
  return res.json();
}

Lesson 8
Static Rendering

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

Lesson 9
not-found.jsx is used for 404 error pages. really useful for all pages

if you want to make a specific one for different sections of the website, you can add another
not-found.jsx inside that folder. it will override the top level not-found.jsx

Lesson 10
Loading UI and Suspense
Basically makes it so some things load while others are still loading

  // imitate a 3 second delay when loading the tickets page to see the loading screen for 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

The navbar stays and the loading page still shows while it is loading. the suspense component wraps the page, not the layout

import React, { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "./loading";

export default function Tickets()
  return (
    main>
      nav>
        div>
          h2>Tickets/h2>
          p>
            small>Currently open tickets./small>
          /p>
        /div>
      /nav>
      Suspense fallback={Loading />}>
        TicketList />
      /Suspense>
    /main>
  );

in this situation, the stuff inside of the nav loads immediately while the ticketlist will load for 3 seconds.. if the fallback loading component isnt there, nothingw ill show there

Lesson 11
we created the createForm.jsx file to create a form and POST method the content into the db.json file
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const ticket = {
      title,
      body,
      priority,
      user_email: "mario@netninja.dev",
    };

    const res = await fetch("http://localhost:4000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });

    if (res.status === 201) {
      // refreshes the route in the background before we get to the tickets page
      router.refresh()
      router.push("/tickets");
    }
  };

Lesson 12