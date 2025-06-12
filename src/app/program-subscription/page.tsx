import React from "react";
import {
  getAllClubs,
  getAllProgramsAction,
  getAllProgramSubscriptions,
} from "./actions/actions";
import ProgramSubscriptionForm from "./components/program-subscription-form";
import { cookies } from "next/headers";

export default async function ProgramSubscriptionPage() {
  const clubs = await getAllClubs();
  const programs = await getAllProgramsAction();
  const programSubscription = await getAllProgramSubscriptions();

  // const fetchClubs = async () => {
  //   try {
  //     const c = await cookies();
  //     const response = await fetch(process.env.URL! + "/api/clubs/get-clubs", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Cookie: c.toString(),
  //       },
  //     });

  //     const json = await response.json();
  //     if (response.ok) {
  //       if (json.success) {
  //       }
  //     } else {
  //       console.log(json);
  //       console.error("Failed to fetch clubs");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching clubs:", error);
  //   }
  // };

  // fetchClubs();

  return (
    <ProgramSubscriptionForm
      fetchedClubs={clubs.data!}
      fetchedPrograms={programs.data!}
      fetchedProgramSubscription={programSubscription.data!}
    />
  );
}
