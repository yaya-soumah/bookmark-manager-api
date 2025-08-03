import { Request, Response } from 'express'

import { AppError } from '../../utils/app-error.util'
import { error, success } from '../../utils/response.util'
import { getPagination } from '../../utils/pagination.util'

import { BookmarkService } from './bookmark.service'

export const createOne = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).user
    const bookmark = await BookmarkService.createOne({ userId: id, ...req.body })

    success(res, 201, bookmark, 'Bookmark created successfully')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const getList = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).user
    const { page, limit, offset, filters } = await getPagination(req.query)

    const data = await BookmarkService.getAll(id, page, limit, offset, filters)
    success(res, 200, data, 'Operation successful')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const getOneById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const bookmark = await BookmarkService.getOneById(id)
    success(res, 200, bookmark, 'Operation successful')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const updateOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const bookmark = await BookmarkService.updateOne(id, req.body)
    success(res, 200, bookmark, 'Bookmark updated successfully')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    await BookmarkService.deleteOne(id)
    success(res, 204, {}, 'Bookmark deleted successfully')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const addTagsToBookmark = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const { tagIds } = req.body

    const bookmark = await BookmarkService.addTags(id, tagIds)
    success(res, 200, bookmark, 'Operation successful')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const removeTagsFromBookmark = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const { tagIds } = req.body
    const bookmark = await BookmarkService.removeTags(id, tagIds)
    success(res, 200, bookmark, 'Operation successful')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const getTagsFromBookmark = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const tags = await BookmarkService.getTags(id)
    success(res, 200, tags, 'Operation successful')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}
