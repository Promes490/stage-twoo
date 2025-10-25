import React, { useEffect, useState } from "react";
import { ticketService } from "../../services/ticketService";
import { toast } from "react-toastify";

const allowed = ["open", "in_progress", "closed"];

export default function TicketForm({ initial = { title: "", status: "open", description: "" }, onSaved }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  useEffect(() => setForm(initial), [initial]);

  const validate = (f) => {
    const e = {};
    if (!f.title || !f.title.trim()) e.title = "Title is required";
    if (!allowed.includes(f.status)) e.status = "Invalid status";
    if (f.description && f.description.length > 1000) e.description = "Description too long";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;
    try {
      if (form.id) {
        await ticketService.update(form.id, form);
        toast.success("Ticket updated");
      } else {
        await ticketService.create(form);
        toast.success("Ticket created");
      }
      setForm({ title: "", status: "open", description: "" });
      onSaved && onSaved();
    } catch (err) {
      toast.error(err.message || "Failed to save ticket");
    }
  };

  return (
    <form onSubmit={submit} className="card">
      <h3>{form.id ? "Edit Ticket" : "Create Ticket"}</h3>
      <label>Title</label>
      <input name="title" value={form.title} onChange={handleChange} />
      {errors.title && <div className="error">{errors.title}</div>}

      <label>Status</label>
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="open">open</option>
        <option value="in_progress">in_progress</option>
        <option value="closed">closed</option>
      </select>
      {errors.status && <div className="error">{errors.status}</div>}

      <label>Description</label>
      <textarea name="description" value={form.description} onChange={handleChange} />

      <div style={{marginTop:10}}>
        <button className="btn" type="submit">{form.id ? "Update" : "Create"}</button>
      </div>
    </form>
  );
}
