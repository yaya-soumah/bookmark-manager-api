import { Request, Response } from 'express'

import { AppError } from '../../utils/app-error.util'
import { error, success } from '../../utils/response.util'
import { getPagination } from '../../utils/pagination.util'

import { TagService } from './tag.service'

export const createOne = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).user
    const { name } = req.body
    const tag = await TagService.createOne(id, name)

    if (!tag) throw new AppError('Error: Tag not created', 400)
    success(res, 201, tag, 'Tag created successfully')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const getList = async (req: Request, res: Response) => {
  try {
    const { page, limit, offset, filters } = await getPagination(req.query)
    const data = await TagService.getAll(page, limit, offset, filters)
    success(res, 200, data, 'Operation successful')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const Tag = await TagService.getOneById(id)
    success(res, 200, Tag, 'Operation successful')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const updateOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const Tag = await TagService.updateOne(id, req.body)
    success(res, 200, Tag, 'Tag updated successfully')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    await TagService.deleteOne(id)
    success(res, 204, {}, 'Tag deleted successfully')
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}
