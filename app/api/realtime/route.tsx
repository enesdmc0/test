import {NextRequest, NextResponse} from "next/server";
import PocketBase from "pocketbase";
import {cookies} from "next/headers";


export async function GET(req: NextRequest, res: NextResponse) {

    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

    const cookieStore = cookies();
    const auth = cookieStore.get("pb_auth");

    pb.authStore.loadFromCookie(`pb_auth=${auth?.value as any}`);


    return NextResponse.json(pb.authStore.isValid ? pb : null);


}