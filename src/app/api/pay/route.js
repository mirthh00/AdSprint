import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

function generateSignature(data, passPhrase = null) {
  let pfOutput = "";

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== "") {
        pfOutput += `${key}=${encodeURIComponent(data[key].toString().trim()).replace(/%20/g, "+")}&`;
      }
    }
  }

  // Remove last &
  let getString = pfOutput.slice(0, -1);

  if (passPhrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;
  }

  return crypto.createHash("md5").update(getString).digest("hex");
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId")

  if (!userId) {
  return NextResponse.json(
    { error: "Missing userId" },
    { status: 400 }
  )
}

  const user = await prisma.user.findUnique({
  where: { id: userId },
})

   if (!user) {
  return NextResponse.json(
    { error: "User not found" },
    { status: 404 }
  )
}

const pricing = {
  starter: 3000,
  growth: 6000,
  scale: 12000,
}

const amount = pricing[user.plan] || 6000

const paymentData = {
  merchant_id: process.env.PAYFAST_MERCHANT_ID,
  merchant_key: process.env.PAYFAST_MERCHANT_KEY,

  return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?name=${encodeURIComponent(user.firstName)}`,

  cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fail?name=${encodeURIComponent(user.firstName)}`,

  notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payfast/notify`,

  name_first: user.firstName,
  name_last: user.lastName,

  email_address: user.email,

  m_payment_id: String(user.id),

  amount: Number(amount).toFixed(2),

  item_name: `${user.plan} Plan - AdSprint`,
}

   const signature = generateSignature(
  paymentData,
  process.env.PAYFAST_PASSPHRASE || null
);

const params = new URLSearchParams(paymentData);

params.append("signature", signature);

    const payfastUrl = `https://sandbox.payfast.co.za/eng/process?${params.toString()}`;

    return NextResponse.redirect(payfastUrl);
  } catch (error) {
    console.error("PayFast error:", error);

    return NextResponse.json(
      { error: "Payment redirect failed" },
      { status: 500 }
    );
  }
}
