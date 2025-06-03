
import { createClient } from "@/utils/supabase/client"
import { type NextRequest, NextResponse } from "next/server"

const supabase = createClient()

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File
        const bucket = formData.get("bucket") as string

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        // Generate unique filename
        const fileExt = file.name.split(".").pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage.from(bucket).upload(fileName, buffer, {
            contentType: file.type,
            upsert: false,
        })

        if (error) {
            console.error("Supabase upload error:", error)
            return NextResponse.json({ error: "Upload failed" }, { status: 500 })
        }

        // Get public URL
        const {
            data: { publicUrl },
        } = supabase.storage.from(bucket).getPublicUrl(fileName)

        return NextResponse.json({
            url: publicUrl,
            path: data.path,
        })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
