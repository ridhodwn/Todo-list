<script>
import { mapActions, mapWritableState } from 'pinia';
import { useTodoStore } from '../stores/todo';

export default {
    data() {
        return {
            title: '',
            clicked: false
        }
    },
    methods: {
        ...mapActions(useTodoStore, ['fetchActivityById', 'updateActivity']),
        updateActivityComponent() {
            this.updateActivity(this.$route.params.id, {
                title: this.title
            });
            this.clicked = false;
        },
        toDashboardPage() {
            this.$router.push('/');
        },
        changeToInput() {
            this.clicked = true;
            this.title = this.activity.data.title;
        }
    },
    computed: {
        ...mapWritableState(useTodoStore, ['activity'])
    },
    created() {
        this.fetchActivityById(this.$route.params.id);
    }
}
</script>

<template>
    <div>
        <a @click.prevent="toDashboardPage" href="#">
            <img src="../assets/todo-back-button.png" id="todo-back-button">
        </a>
        <div class="d-flex flex-row" id="container-title">
            <div>
                <div v-if="!clicked">
                    <h1 data-cy="todo-title" id="todo-title" class="">{{ activity.data.title }}</h1>
                </div>
                <div v-else>
                    <input v-model="title" @change.prevent="updateActivityComponent"
                        class="form-control py-2 border-0 border-dark border-bottom rounded-0" type="text"
                        id="update-activity-input">
                </div>
            </div>
            <a @click.prevent="changeToInput" href="#">
                <img src="../assets/todo-title-edit-button.png" id="todo-title-edit-button" class="mt-3 ms-4">
            </a>
        </div>
        <div v-if="!activity">
            <img src="../assets/todo-sort-button.png" id="todo-sort-button">
        </div>
        <button type="button" data-cy="todo-add-button" id="todo-add-button" data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            <img src="../assets/tabler-plus.png" id="tabler-plus">
            <h6 data-cy="Tambah" id="Tambah">Tambah</h6>
        </button>
    </div>
    <img src="../assets/todo-empty-state.png" id="todo-empty-state">

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Tambah List Item</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="col-form-label">NAMA LIST ITEM</label>
                            <input type="text" class="form-control" placeholder="Tambahkan nama Activity">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">PRIORITY</label>
                            <select class="form-control">
                                <option value="very-high" selected>Very High</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                                <option value="very-low">Very Low</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Send message</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#todo-back-button {
    position: absolute;
    width: 32px;
    height: 32px;
    left: 143px;
    top: 154px;
}

#container-title {
    position: absolute;
    width: 500px;
    left: 180px;
    top: 140px;
}

#todo-title {
    width: auto;
    height: 54px;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 54px;
    color: #111111;
}

#todo-title-edit-button {
    width: 24px;
    height: 24px;
}

#update-activity-input {
    width: auto;
    height: 54px;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 54px;
    color: #111111;
    background-color: #F4F4F4;
}

#todo-sort-button {
    position: absolute;
    width: 54px;
    height: 54px;
    left: 910px;
    top: 150px;
}

#todo-add-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border: none;
    position: absolute;
    width: 159px;
    height: 54px;
    left: 984px;
    top: 147px;
    background: #16ABF8;
    border-radius: 45px;
}

#tabler-plus {
    width: 24px;
    height: 24px;
    background: #16ABF8;
}

#Tambah {
    font-weight: 600;
    font-size: 20px;
    color: #FFFFFF;
    margin-top: 5px;
    align-self: center;
}

#todo-empty-state {
    position: absolute;
    width: 420px;
    height: 320px;
    left: 32vw;
    top: 38vh;
}
</style>