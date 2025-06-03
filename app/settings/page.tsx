"use client";

import dynamic from "next/dynamic";
import React from "react";

const SettingsContent = dynamic(() => import("@/components-custom/common/SettingsContent"), {
  ssr: false,
});

export default function SettingsPage() {
  return <SettingsContent />;
}
