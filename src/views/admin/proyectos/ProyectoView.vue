<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { GetProjectById } from '@/services/projects/projectService';
import { useRoute } from 'vue-router';
import AddEmployeeToProject from '@/components/blocks/project/employees/AddEmployeeToProject.vue'
import CreateResourceForProject from '@/components/blocks/project/resources/CreateResourceForProject.vue'
import CreateTask from '@/components/blocks/project/task/CreateTask.vue'
import ChangeStatusForm from '@/components/blocks/project/ChangeStatusForm.vue'
import DeleteUserFromProjectForm
  from '@/components/blocks/project/employees/DeleteUserFromProjectForm.vue'
import type { ProjectModel } from '@/interfaces/Projects/ProjectModel';
import AssignTaskToEmployeeForm
  from '@/components/blocks/project/task/employee/AssignTaskToEmployeeForm.vue'

const route = useRoute();
const project = ref<ProjectModel | null>(null);
const tasks = ref<{ id: string; name: string; description:string; showActivities?: boolean; activities: { name: string; description: string }[], users: string[] }[]>([]);
const resources = ref<{name: string; quantity: number}[]>([]);
const members = ref<{name: string; role:string; id: string}[]>([]);
const encharge = ref<string | null>( null);
const status = ref<string | null>(null);

onBeforeMount(async () => {
  const id = route.params.id as string;
  console.log("projectId", id);

  try {
    const getProject = await GetProjectById(id);
    console.log("getProject", getProject);

    if (getProject.success) {
      project.value = getProject.data.project;
      encharge.value = getProject.data.encharge && getProject.data.encharge.length > 0 ? `${getProject.data.encharge[0].employee.name} ${getProject.data.encharge[0].employee.lastName}` : "";
      members.value = getProject.data.employees.map((employee: any) => ({name: `${employee.employee.name} ${employee.employee.lastName}`, role: employee.roles[0], id: employee.employee.id}));
      resources.value = getProject.data.project.projectResources.map((resource: any) => ({ name : resource.resource.name, quantity: resource.quantity}) );
      tasks.value = getProject.data.project.tasks.map((task: any) => ({
        id: task.id,
        name: task.name,
        description: task.description,
        users: task.taskEmployees.map((act: any) => `${act.employee.name} ${act.employee.lastName}`),
        activities: task.activities.map((act: any) => ({ name: act.name, description: act.description })),
        showActivities: false
      }));
      status.value = getProject.data.status;

      console.log("tareas", tasks.value);
    }
  } catch (error) {
    console.error("Error fetching project:", error);
  }
});

const toggleTasks = (index: number) => {
  tasks.value[index].showActivities = !tasks.value[index].showActivities;
};
</script>

<template>
  <div class="p-4">

    <div v-if="project" class="p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center bg-white mb-4">
      <div>
        <p class="text-2xl font-semibold text-DarkTeal">Nombre: {{ project.name }}</p>
        <p class="text-md pl-5">Descripción: {{ project.description }}</p>
      </div>
      <div class="text-right flex flex-col text-sm gap-2 text-gray-500 mt-4 md:mt-0">
        <ChangeStatusForm :id="route.params.id" :status="status" />
        Encargado: {{ encharge ? encharge : "N/A" }}
      </div>
    </div>


    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div class=" p-4 rounded-lg bg-white">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-semibold mb-2">Recursos</h3>
          <CreateResourceForProject  :id="route.params.id"/>
        </div>

        <div class="grid grid-cols-1 h-[50vh] overflow-auto gap-4">
          <div
            v-for="(resource, index) in resources"
            :key="index"
            class="p-4 h-20  rounded-lg bg-slate-100"
          >
            <p class="font-medium text-CharcoalBlue">{{ resource.name }}</p>
            <p class="text-sm text-gray-600">Cantidad: {{ resource.quantity }}</p>
          </div>
        </div>

      </div>

      <div class=" p-4 rounded-lg bg-white">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-semibold mb-2">Integrantes</h3>
          <AddEmployeeToProject />
        </div>

        <div class="grid grid-cols-1 h-[50vh] overflow-auto gap-4">
          <div
            v-for="(member, index) in members"
            :key="index"
            class="p-4 h-20 flex justify-between rounded-lg bg-slate-100"
          >
            <div class="">
              <p class="font-medium text-CharcoalBlue">{{ member.name }}</p>
              <p class="text-sm text-gray-600">Rol: {{ member.role }}</p>
            </div>

            <DeleteUserFromProjectForm :employeeId="member.id" :role="member.role" />

          </div>
        </div>

      </div>


    </div>


    <div class="p-4 rounded-lg bg-white mb-4">
      <div class="flex justify-between items-center">
        <p class="text-lg font-semibold">Lista de tareas</p>
        <CreateTask />
      </div>
      <div class="mt-4 min-h-[50vh] max-h-[100vh] overflow-y-auto">
        <div v-for="(task, index) in tasks" :key="index" class="p-4 rounded-lg bg-slate-100 mt-4">
          <div @click="toggleTasks(index)" class="cursor-pointer grid grid-cols-1 md:grid-cols-5 gap-4">
            <div class="col-span-3">
              <h3 class="text-md font-semibold cursor-pointer">
                {{ task.name }}
              </h3>
              <p class="pl-5">{{ task.description }}</p>
            </div>
            <div class="col-span-2">
              <h3 class=" flex items-center gap-3 text-md font-semibold cursor-pointer">
                Integrantes <AssignTaskToEmployeeForm :project-members="members" :task-id="task.id" />
              </h3>
              <ul v-for="(user, i) in task.users" :key="i" class="list-disc pl-10">
                <li class="text-md">{{ user }}</li>
              </ul>
            </div>
          </div>

          <div v-if="task.showActivities" class="mt-4 pl-5" :style="task.activities.length > 4 ? ' px-10  ' : ''">
            <h3 class=" mb-3 flex items-center gap-3 text-md font-semibold cursor-pointer">
              Tareas
            </h3>
            <div class="grid grid-cols-1 gap-4">
              <div v-for="(activity, i) in task.activities" :key="i" class="p-4 rounded-lg bg-white">
                <p class="text-md font-semibold">{{ activity.name }}</p>
                <p class="pl-5">{{ activity.description }}</p>
              </div>
            </div>
            <div class="flex justify-end mt-4">
              <router-link :to="{ name: 'tareas-detalle', params: { id: id, idTarea: task.id } }">
                <button
                  class="text-sm text-DarkTeal bg-white px-2 py-2 rounded-2xl"
                  style="max-width: 140px; white-space: normal;">
                  Ver más...
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

