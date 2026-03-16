import React, { useState } from "react";
import styled from "styled-components";
import { submitContact } from "../api/contactApi";

const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 28px;
  background: ${({ theme }) => theme.card || "#fff"};
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(8, 15, 30, 0.06);
  color: ${({ theme }) => theme.text_primary};
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
  font-size: 28px;
  color: ${({ theme }) => theme.text_primary};
`;

const Subtitle = styled.p`
  margin: 0 0 20px 0;
  color: ${({ theme }) => theme.text_secondary};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border || "#e6e9ef"};
  background: ${({ theme }) => theme.input_bg || "transparent"};
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 6px 18px ${({ theme }) => (theme.primary + "20") || "rgba(0,0,0,0.06)"};
  }
`;

const Textarea = styled.textarea`
  padding: 12px 14px;
  min-height: 140px;
  resize: vertical;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border || "#e6e9ef"};
  background: ${({ theme }) => theme.input_bg || "transparent"};
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 6px 18px ${({ theme }) => (theme.primary + "20") || "rgba(0,0,0,0.06)"};
  }
  grid-column: 1 / -1;
`;

const ButtonRow = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 6px;
`;

const Button = styled.button`
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${({ primary, theme }) => (primary ? theme.primary : "transparent")};
  color: ${({ primary, theme }) => (primary ? theme.button_text || "#fff" : theme.text_primary)};
  box-shadow: ${({ primary }) => (primary ? "0 8px 18px rgba(0,0,0,0.08)" : "none")};
  border: 1px solid ${({ primary, theme }) => (primary ? "transparent" : theme.border || "#e6e9ef")};
  transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease;
  &:hover {
    transform: translateY(-2px);
    opacity: 0.98;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Error = styled.p`
  color: #d03b3b;
  margin: 6px 0 0 0;
  font-size: 13px;
  grid-column: 1 / -1;
`;

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // basic front validation
    if (!form.name || !form.email || !form.message) {
      setError("Please fill name, email and message.");
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      alert("Message sent. Thank you!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Contact Us</Title>
      <Subtitle>Have a question or feedback? Send us a message and we'll get back to you shortly.</Subtitle>

      <Form onSubmit={onSubmit} noValidate>
        <Field>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={form.name} onChange={onChange} placeholder="Your full name" />
        </Field>

        <Field>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
        </Field>

        <Field style={{ gridColumn: "1 / -1" }}>
          <Label htmlFor="subject">Subject (optional)</Label>
          <Input id="subject" name="subject" value={form.subject} onChange={onChange} placeholder="Short subject" />
        </Field>

        <Field style={{ gridColumn: "1 / -1" }}>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" value={form.message} onChange={onChange} placeholder="Write your message here..." />
        </Field>

        {error && <Error>{error}</Error>}

        <ButtonRow>
          <Button type="reset" onClick={() => setForm({ name: "", email: "", subject: "", message: "" })} disabled={loading}>
            Reset
          </Button>
          <Button type="submit" primary disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </ButtonRow>
      </Form>
    </Container>
  );
}