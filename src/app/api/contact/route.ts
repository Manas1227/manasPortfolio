import { Resend } from "resend";
import { NextResponse } from "next/server";
import { PERSONAL_EMAIL, RESEND_API_KEY } from "@/lib/env";

const resend = new Resend(RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { v_name, v_email, v_message } = await req.json();

        if (!v_name || !v_email || !v_message) {
            return NextResponse.json(
                { error: "Missing Required Field(s)" },
                { status: 400 }
            );
        }

        const result = await resend.emails.send({
            from: "Manas Portfolio <onboarding@resend.dev>",
            to: PERSONAL_EMAIL,
            replyTo: v_email,
            subject: `${v_name} sent a message.`,
            html: `
                <div style="font-family: sans-sarif; line-height: 1.6">
                    <h2> New Contact Message</h2>
                    <p><strong>Name: </strong> ${v_name} </p>
                    <p><strong>Email: </strong> ${v_email} </p>
                    <p><strong>Message: </strong></p>
                    <p>${v_message}</p>
                </div>
            `,
        });

        if (result.error) {
            return NextResponse.json(
            { success: false, message: result.error.message},
            { status: 400 }
        );
        }
        return NextResponse.json(
            { success: true, message: "Email sent successfully."},
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to send message."},
            { status: 500 }
        )
    }
}


