import { User } from '../users/user.model'
import { Folder } from '../folders/folder.model'
import { Bookmark, BookmarkTags } from '../bookmarks/bookmark.model'
import { Tag } from '../tags/tag.model'

// export all models for easier access elsewhere
export const models = [User, Folder, Bookmark, Tag, BookmarkTags]

export { User, Folder, Bookmark, Tag, BookmarkTags }
