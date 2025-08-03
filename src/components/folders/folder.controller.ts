import { Request, Response } from 'express'

import { AppError } from '../../utils/app-error.util'
import { error, success } from '../../utils/response.util'
import { getPagination } from '../../utils/pagination.util'

import { FolderService } from './folder.service'

export const createOne = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).user
    const { name } = req.body
    const folder = await FolderService.createOne(id, name)

    if (!folder) throw new AppError('Error: folder not created', 400)
    success(res, 201, folder, 'Folder created successfully')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const getList = async (req: Request, res: Response) => {
  try {
    const { page, limit, offset, filters } = await getPagination(req.query)
    const data = await FolderService.getAll(page, limit, offset, filters)
    success(res, 200, data, 'Operation successful')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const getOneById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const folder = await FolderService.getOneById(id)
    success(res, 200, folder, 'Operation successful')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const updateOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const folder = await FolderService.updateOne(id, req.body)
    success(res, 200, folder, 'Folder updated successfully')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    await FolderService.deleteOne(id)
    success(res, 204, {}, 'Folder deleted successfully')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}
