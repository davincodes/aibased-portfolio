import { Suspense } from "react";
import { Sidebar, SidebarContent, SidebarRail } from "./ui/sidebar";
import ChatWraapper from "./chat/ChatWrapper";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <ChatWraapper />
        </Suspense>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
