import { NextResponse } from 'next/server';
import { EmailTemplate } from '../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req){
    const response = await req.json()
    try{ 
        const data  = await resend.emails.send({
            from: 'khushijain.mp@gmail.com',
            to: [response.data.Email],
            subject: 'Appointment Booking Confirmation',
            react: EmailTemplate({ response }),
          });
        return NextResponse.json({data})
    }
    catch(error){
        return NextResponse.json({error})
    }
}