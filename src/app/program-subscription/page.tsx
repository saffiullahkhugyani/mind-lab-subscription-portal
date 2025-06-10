import React from "react";
import {
  getAllClubs,
  getAllProgramsAction,
  getAllProgramSubscriptions,
} from "./actions/actions";
import ProgramSubscriptionForm from "./components/program-subscription-form";

export default async function ProgramSubscriptionPage() {
  const clubs = await getAllClubs();
  const programs = await getAllProgramsAction();
  const programSubscription = await getAllProgramSubscriptions();

  return (
    <ProgramSubscriptionForm
      fetchedClubs={clubs.data!}
      fetchedPrograms={programs.data!}
      fetchedProgramSubscription={programSubscription.data!}
    />
  );
}
