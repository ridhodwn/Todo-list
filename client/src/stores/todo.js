import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
    state: () => ({
        activities: [],
        activity: '',
        todoItems: [],
        todoItem: {},
        baseUrl: "https://todo.api.devcode.gethired.id",
        todoActivity: []
    }),
    actions: {
        async createActivity() {
            try {
                console.log('in Create Activity');
                const { data } = await axios({
                    method: 'post',
                    url: this.baseUrl + '/activity-groups',
                    data: {
                        "title": "New Activity",
                        "email": "dewantororidho@gmail.com"
                    }
                });
                console.log(data);
                this.fetchActivities();
            } catch (error) {
                console.log(error);
            }
        },
        async fetchActivities() {
            try {
                console.log('in Fetch Activities');
                const { data } = await axios({
                    method: 'get',
                    url: this.baseUrl + '/activity-groups?email=dewantororidho@gmail.com'
                });
                this.activities = data.data;
                console.log(this.activities);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteActivity(id, title) {
            try {
               await axios({
                    method: 'delete',
                    url: this.baseUrl + `/activity-groups/${id}`
                })
                this.fetchActivities();
            } catch (error) {
                console.log(error);
            }
        },
        async fetchActivityById(id) {
            try {
                console.log('in Fetch Activity by ID');
                console.log(id);
                const data = await axios({
                    method: 'get',
                    url: this.baseUrl + `/activity-groups/${id}`
                });
                this.activity = data;
            } catch (error) {
                console.log(error);
            }
        },
        async updateActivity(id, value) {
            try {
                console.log('in Update Activity');
                const data = await axios({
                    method: 'patch',
                    url: this.baseUrl + `/activity-groups/${id}`,
                    data: value
                });
                this.activity = data;
                console.log(this.activity);
            } catch (error) {
                console.log(error);
            }
        },
        async createTodoItem(id, value) {
            try {
                console.log('in Create TodoItem');
                const { data } = await axios({
                    method: 'post',
                    url: this.baseUrl + '/todo-items',
                    data: {
                        "title": value.name,
                        "activity_group_id": id
                    }
                });
                console.log(data);
                this.fetchTodoItems(id);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchTodoItems(activityId) {
            try {
                console.log('in Fetch Todo Items');
                const { data } = await axios({
                    method: 'get',
                    url: this.baseUrl + `/todo-items?activity_group_id=${activityId}`
                });
                console.log(data.data);
                this.todoItems = data.data;
                // console.log(this.todoItems);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteTodoItem(id, title, activityId) {
            try {
                await axios({
                    method: 'delete',
                    url: this.baseUrl + `/todo-items/${id}`
                })
                this.fetchTodoItems(activityId);
            } catch (error) {
                console.log(error);
            }
        },
        async updateTodoItem(id, value, activityId) {
            try {
                console.log('in Update Todo Item');
                console.log(value)
                const data = await axios({
                    method: 'patch',
                    url: this.baseUrl + `/todo-items/${id}`,
                    data: {
                        "title": value.name
                    }
                });
                this.todoItem = data;
                this.fetchTodoItems(activityId);
                // console.log(this.todoItem);
            } catch (error) {
                console.log(error);
            }
        }
    }
})