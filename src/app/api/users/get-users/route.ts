import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, email")
      .order("name", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      return Response.json("No users found", { status: 404 });
    }

    const userList = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        email: item.email,
      };
    });

    return Response.json({ success: true, data: userList }, { status: 200 });
  } catch (error: any) {
    console.log("Error: ", error);
    return Response.json({ error: `Error: ${error}` }, { status: 500 });
  }
}
