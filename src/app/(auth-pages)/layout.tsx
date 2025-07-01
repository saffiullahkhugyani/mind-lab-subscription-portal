import { readUserSession } from "@/lib/actions/actions";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userSession } = await readUserSession();

  console.log(userSession);
  if (userSession.session !== null) {
    return redirect("/dashboard");
  }

  return (
    <div className="max-w-7xl flex flex-col gap-12 items-start">{children}</div>
  );
}
