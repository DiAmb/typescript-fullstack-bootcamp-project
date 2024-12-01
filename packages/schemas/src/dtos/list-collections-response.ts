import { Collection } from '../models/collections'
import { GenericResponse } from './generic-response'

export type ListCollectionsResponse = GenericResponse<Collection[]>
