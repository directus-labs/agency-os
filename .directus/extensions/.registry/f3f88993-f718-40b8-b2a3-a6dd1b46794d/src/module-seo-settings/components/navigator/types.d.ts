export interface NavigatorItem {
	icon?: number
    name?: string
    to?: string
    hidde?: boolean
    childrens?: NavigatorItem | []
}