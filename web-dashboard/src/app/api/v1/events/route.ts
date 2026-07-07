import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LocalReasoningEngine } from "@/engine/twin";

export async function GET() {
  try {
    const events = await prisma.lifeEvent.findMany({
      orderBy: { id: "desc" }
    });
    return NextResponse.json({ events });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, title, date, impact } = body;

    const twin = await prisma.userTwin.findFirst({
      include: { financialState: true }
    });

    if (!twin || !twin.financialState) {
      return NextResponse.json({ error: "Twin not found" }, { status: 404 });
    }

    // 1. Save new event to database
    const newEvent = await prisma.lifeEvent.create({
      data: {
        type,
        title,
        date,
        impact,
        userTwinId: twin.id
      }
    });

    // 2. Trigger Local Reasoning Engine Evaluation
    const engine = new LocalReasoningEngine(
      {
        id: twin.id,
        name: twin.name,
        stateOfResidence: twin.stateOfResidence,
        filingStatus: twin.filingStatus,
        riskTolerance: twin.riskTolerance
      },
      {
        netWorth: twin.financialState.netWorth,
        taxEfficiency: twin.financialState.taxEfficiency,
        portfolioDrift: twin.financialState.portfolioDrift,
        safeWithdrawalRate: twin.financialState.safeWithdrawalRate
      }
    );

    const evaluation = await engine.evaluateEvent({
      id: 0, // Mock id for engine
      type,
      title,
      date,
      impact
    });

    // 3. Update FinancialState with new evaluated math
    await prisma.financialState.update({
      where: { id: twin.financialState.id },
      data: {
        netWorth: evaluation.newState.netWorth,
        taxEfficiency: evaluation.newState.taxEfficiency
      }
    });

    return NextResponse.json({ 
      event: newEvent, 
      evaluation 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
