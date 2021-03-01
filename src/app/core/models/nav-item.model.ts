export interface NavItem {
  name: string;
  iconName: string;
  route?: string;
  children?: NavItem[];
}
