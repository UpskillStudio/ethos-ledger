import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const twin = await prisma.userTwin.findFirst({
      include: {
        financialState: true,
        lifeEvents: {
          orderBy: { date: "desc" },
          take: 5
        }
      }
    });

    if (!twin) {
      return NextResponse.json({ error: "Twin not found" }, { status: 404 });
    }

    return NextResponse.json({ twin });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
