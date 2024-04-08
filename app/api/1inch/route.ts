import {NextRequest, NextResponse} from "next/server";
import axios1Inch from "@/utils/1inch/axiosInstance";
import {extractErrorDetails} from "@/utils/helpers";
import {AxiosError} from "axios";

export async function GET(
    req: NextRequest
) {
    try {
        const { searchParams } = req.nextUrl;
        const url = decodeURIComponent(searchParams.get('url') as string)
        const response = await axios1Inch.get(url);

        return NextResponse.json({ ...response.data });
    } catch (error) {
        const errorData = extractErrorDetails(error as AxiosError | Error)
        return NextResponse.json({ message: errorData.message }, { status: errorData.status })
    }
}