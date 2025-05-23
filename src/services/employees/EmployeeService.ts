import { genericRequest } from "@/utils/genericRequest"
import type { ResponseHelper } from "@/interfaces/helpers/ResponseHelper"
import type { ResponseHelperArray } from "@/interfaces/helpers/ResponseHelperArray"
import type { createEmployeeModel, EmployeeModel } from "@/interfaces/employees/EmployeeModel"
import type { ProjectModel } from "@/interfaces/Projects/ProjectModel"
import type { EmployeeBasicModel } from "@/interfaces/employees/EmployeeBasicModel"
import type { EmployeeDashboardDataModel } from "@/interfaces/employees/EmployeeDashboardDataModel"

const controller = "Employee"

export const getEmployeesWithoutProject = async (): Promise<ResponseHelperArray<EmployeeModel>> => {
  return await genericRequest(`${controller}/GetAllWithoutProject`, 'GET')
}

export const asignProjectToEmployee = async ( employeeId : string, projectId: string,role: string) => {
  return await genericRequest(`${controller}/AssignProject`, 'POST', { employeeId, projectId, role})
}

export const RemoveProject = async (employeeId : string, role: string ) => {
  return await genericRequest(`${controller}/RemoveProject`, 'POST', {employeeId, role})
}

export const getAllEmployees = async () => {
  return await genericRequest(`${controller}/`, 'GET')
}

export const getEmployees = async (): Promise<ResponseHelperArray<EmployeeModel>> => {
  return await genericRequest(`${controller}`, 'GET')
}

export const getEmployee = async (id: string): Promise<ResponseHelper<EmployeeModel>> => {
  return await genericRequest(`${controller}/${id}`, 'GET')
}

export const createEmployee = async (data: createEmployeeModel): Promise<ResponseHelper<EmployeeModel>> => {
  const { email, password, confirmPassword, name, lastName, age, sexo, curp, rfc, salary } = data;
  return await genericRequest(`Auth/register`, 'POST', { email, password, confirmPassword, name, lastName, age, sexo, curp, rfc, salary})
}

export const updateEmployee = async (data: EmployeeModel): Promise<ResponseHelper<EmployeeModel>> => {
  const { id, name, lastName, age, sexo, curp, rfc, salary, userId, projectId } = data;

  return await genericRequest(`${controller}/${id}`, 'PUT', { id, name, lastName, age, sexo, curp, rfc, salary, userId, projectId })
}

export const deleteEmployee = async (id: string): Promise<ResponseHelper<EmployeeModel>> => {
  return await genericRequest(`${controller}/${id}`, 'DELETE')
}

export const GetEmployeeDataDashboard = async (id: string): Promise<ResponseHelper<EmployeeDashboardDataModel>> => {
  return await genericRequest(`${controller}/GetEmployeeDataDashboard?EmployeeId=${id}`, 'GET')
}


export const GetEmployeeProject = async (id: string): Promise<ResponseHelper<ProjectModel>> => {
  return await genericRequest(`${controller}/GetEmployeeProject?employeeId=${id}`, 'GET')
}

export const GetEmployeesFromProject = async (id: string): Promise<ResponseHelperArray<EmployeeBasicModel>> => {
  return await genericRequest(`${controller}/GetEmployeesFromProject?projectId=${id}`, 'GET')
}

export const GetEmployeeData = async (id: string): Promise<ResponseHelper<EmployeeModel>> => {
  return await genericRequest(`${controller}/GetEmployeeData?userId=${id}`, 'GET')
}




