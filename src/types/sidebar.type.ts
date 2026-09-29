export interface SidebarItem {
  title: string;
  url: string;
  isActive?: boolean;
  onclick?: string;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export type SidebarData = SidebarGroup[];
