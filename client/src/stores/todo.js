import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
    state: () => ({
        activities: {},
        activity: '',
        baseUrl: "https://todo.api.devcode.gethired.id/activity-groups"
    }),
    actions: {
        async createActivity() {
            try {
                console.log('in Create Activity');
                const { data } = await axios({
                    method: 'post',
                    url: this.baseUrl,
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
                    url: this.baseUrl + '?email=dewantororidho@gmail.com'
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
                        url: this.baseUrl + `/${id}`
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
                    url: this.baseUrl + `/${id}`
                });
                this.activity = data;
                console.log(this.activity);
            } catch (error) {
                console.log(error);
            }
        },
        async updateActivity(id, value) {
            try {
                console.log('in Update Activity');
                const data = await axios({
                    method: 'patch',
                    url: this.baseUrl + `/${id}`,
                    data: value
                });
                this.activity = data;
                console.log(this.activity);
            } catch (error) {
                console.log(error);
            }
        }
    }
})