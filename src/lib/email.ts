import { Resend } from "resend";

const resend=process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendInquiryNotification(input:{name:string;company:string;email:string;message:string}) {
  if(!resend||!process.env.NOTIFICATION_EMAIL) return;
  await resend.emails.send({
    from: process.env.EMAIL_FROM || "ATELIER/X <noreply@example.com>",
    to: process.env.NOTIFICATION_EMAIL,
    subject: `New inquiry — ${input.company}`,
    text: `${input.name} (${input.email})\n\n${input.message}`,
  });
}
