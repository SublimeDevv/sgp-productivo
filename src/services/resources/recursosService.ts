import type { ResourceModel } from "@/interfaces/resources/ResourceModel"
import { genericRequest } from "@/utils/genericRequest"
import type { ResponseHelperArray } from "@/interfaces/helpers/ResponseHelperArray"
import type { ResponseHelper } from "@/interfaces/helpers/ResponseHelper"
import type { ProjectWithResourceModel } from "@/interfaces/resources/ProjectWithResourceModel"
import type { ResourceDashboardDataModel } from "@/interfaces/resources/ResourceDashboardDataModel"

const controller = "Resource"

export const getResources = async (): Promise<ResponseHelperArray<ResourceModel>> => {
  return await genericRequest(`${controller}`, 'GET')
}

export const getResource = async (id: string): Promise<ResponseHelper<ResourceModel>> => {
  return await genericRequest(`${controller}/${id}`, 'GET')
}

export const getResourceWithProjects = async (id: string): Promise<ResponseHelper<ProjectWithResourceModel>> => {
  return await genericRequest(`${controller}/GetResourceWithProjects?Id=${id}`, 'GET')
}

export const GetDashboardDataResources = async (): Promise<ResponseHelper<ResourceDashboardDataModel>> => {
  return await genericRequest(`${controller}/GetDashboardDataResources`, 'GET')
}

export const createResource = async (data: ResourceModel): Promise<ResponseHelper<ResourceModel>> => {
  const { name, description, quantity } = data;
  return await genericRequest(`${controller}`, 'POST', { name, description, quantity })
}

export const updateResource = async (data: ResourceModel): Promise<ResponseHelper<ResourceModel>> => {
  const { id, name, description, quantity } = data;
  return await genericRequest(`${controller}/${id}`, 'PUT', { id, name, description, quantity })
}

export const deleteResource = async (id: string): Promise<ResponseHelper<ResourceModel>> => {
  return await genericRequest(`${controller}/${id}`, 'DELETE')
}
