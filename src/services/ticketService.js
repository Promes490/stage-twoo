import { v4 as uuidv4 } from "uuid";

const TICKETS_KEY = "ticketapp_tickets";

function loadTickets() {
  const raw = localStorage.getItem(TICKETS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveTickets(list) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(list));
}

const ALLOWED = ["open", "in_progress", "closed"];

export const ticketService = {
  list: () => Promise.resolve(loadTickets()),

  create: (ticket) => {
    if (!ticket.title || !ticket.title.trim()) return Promise.reject(new Error("Title is required"));
    if (!ALLOWED.includes(ticket.status)) return Promise.reject(new Error("Invalid status"));
    const list = loadTickets();
    const newTicket = { id: uuidv4(), createdAt: Date.now(), ...ticket };
    list.unshift(newTicket);
    saveTickets(list);
    return Promise.resolve(newTicket);
  },

  update: (id, updates) => {
    if (updates.status && !ALLOWED.includes(updates.status)) return Promise.reject(new Error("Invalid status"));
    const list = loadTickets();
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) return Promise.reject(new Error("Ticket not found"));
    list[idx] = { ...list[idx], ...updates, updatedAt: Date.now() };
    saveTickets(list);
    return Promise.resolve(list[idx]);
  },

  remove: (id) => {
    const list = loadTickets();
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) return Promise.reject(new Error("Ticket not found"));
    const removed = list.splice(idx, 1)[0];
    saveTickets(list);
    return Promise.resolve(removed);
  },
};
