import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const body = await req.json()

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      plan,
    } = body

    // Validation
    if (!firstName || !lastName || !email || !phone || !plan) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      )
    }

    

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        company: company || null,
        plan,
        status: "pending",
      },
    })

    // Plan pricing
    const pricing = {
      starter: 3000,
      growth: 6000,
      scale: 12000,
    }

    const amount = pricing[plan] || 6000

    return NextResponse.json({
      success: true,
      userId: user.id,
      amount,
      paymentUrl: `/api/pay?userId=${user.id}`,
    })
  } catch (error) {
    console.error("Checkout error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    )
  }
}
