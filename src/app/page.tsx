'use client'

import { useEffect, useState } from "react";
import Cover from "./pages/cover";
import Main from "./pages/main";
import AudioPlayer from "@/components/AudioPlayer";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const [invitedName, setInvitedName] = useState<string>("");
  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    const name = searchParams.get('to');
    if (name) {
      setInvitedName(name);
    }
  }, [searchParams]);

  if (!opened) {
    return (
      <Cover 
        name={invitedName}
        onOpen={() => setOpened(true)}
      />
    )
  }
  return (
    <>
      <Main />
      <AudioPlayer autoPlayTrigger={opened} />
    </>
  );
}
