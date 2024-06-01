
export enum DOC_TYPE {
	EMPTY = "empty",

	USERS = "users",
	USER = "user",

	LOGS = "logs",
	ABOUT = "about",

	TEXT_EDITOR = "text_editor",
	CODE_EDITOR = "code_editor",
	HELP = "help",

	ACCOUNT = "account",
}

export enum DOC_ANIM {
	SHOW = "show",
	EXIT = "exit",
	DRAGGING = "dragging",
	EXITING = "exiting",
	SHOWING = "showing",
	SIZING = "iconize",
}

export enum EDIT_STATE {
	NEW,
	READ,
	EDIT,
}

export const ANIM_TIME = 200
export const ANIM_TIME_CSS = 200
