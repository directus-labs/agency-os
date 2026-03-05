export interface Folder {
	/** Unique identifier for the folder. */
	id: string;
	/** Name of the folder. */
	name: string;
	/** Unique identifier of the parent folder. This allows for nested folders. */
	parent: string | Folder | null;
}
