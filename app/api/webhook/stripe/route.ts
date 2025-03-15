import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = await headers();
  const signature = headersList.get('Stripe-Signature');

  if (!signature) {
    return new Response('Missing Signature', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new Response('Webhook error', { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const customerId = session.customer as string;
    const jobId = session.metadata?.jobId as string;

    if (!jobId) {
      return new Response('Missing Job Id', { status: 400 });
    }

    const company = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId,
      },
      select: {
        company: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!company) {
      return new Response('No company found for user', { status: 400 });
    }

    await prisma.jobPost.update({
      where: {
        id: jobId,
        companyId: company?.company?.id,
      },
      data: {
        status: 'ACTIVE',
      },
    });
  }

  return new Response(null, { status: 200 });
}
