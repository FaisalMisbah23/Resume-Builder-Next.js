import clientPromise from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const collection = client.db().collection('education');
    try {
        const data = await collection.find({ userId: user.id }).toArray();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { degree, university, located, gpa, tasks } = await req.json();
    const client = await clientPromise;
    const collection = client.db().collection('education');
    try {
        const data = { userId: user.id,degree, university, located, gpa, tasks };
        await collection.insertOne(data);
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { _id, degree, university, located, gpa, tasks } = await req.json();
    const client = await clientPromise;
    const collection = client.db().collection('education');
    try {
        await collection.updateOne({ _id: new ObjectId(_id), userId: user.id }, { $set: { degree, university, located, gpa, tasks } });
        return NextResponse.json({ message: "Uplocatedd successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    const client = await clientPromise;
    const collection = client.db().collection('education');
    try {
        await collection.deleteOne({ _id: new ObjectId(id), userId: user.id });
        return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
