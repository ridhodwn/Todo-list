import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
    state: () => ({
        activities: {},
        activity: '',
        todoItems: {},
        todoItem: {},
        baseUrl: "https://todo.api.devcode.gethired.id"
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
        deleteActivity(id, title) {
            console.log('in Delete Activity');
            Swal.fire({
                text: `Apakah anda yakin menghapus activity "${title}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#888888',
                confirmButtonText: 'Hapus',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios({
                        method: 'delete',
                        url: this.baseUrl + `/activity-groups/${id}`
                    }).then(() => {
                        this.fetchActivities();
                        Swal.fire({
                            icon: 'info',
                            text: 'Activity berhasil dihapus',
                            showConfirmButton: false
                        })
                    });
                }
            });
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
        deleteTodoItem(id, title, activityId) {
            console.log('in Delete Todo Item');
            Swal.fire({
                text: `Apakah anda yakin menghapus activity "${title}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#888888',
                confirmButtonText: 'Hapus',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios({
                        method: 'delete',
                        url: this.baseUrl + `/todo-items/${id}`
                    }).then(() => {
                        this.fetchTodoItems(activityId);
                        Swal.fire({
                            icon: 'info',
                            text: 'Activity berhasil dihapus',
                            showConfirmButton: false
                        })
                    });
                }
            });
        },
        async updateTodoItem(id, value) {
            try {
                console.log('in Update Todo Item');
                const data = await axios({
                    method: 'patch',
                    url: this.baseUrl + `/todo-items/${id}`,
                    data: {
                        "title": value.name
                    }
                });
                this.todoItem = data;
                console.log(this.todoItem);
            } catch (error) {
                console.log(error);
            }
        },
    }
})