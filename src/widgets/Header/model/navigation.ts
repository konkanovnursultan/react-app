export interface NavigationItem {
  label: string;
  path: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    label: "Главная",
    path: "/",
  },
  {
    label: "Редактирование",
    path: "/edit",
  },
];
