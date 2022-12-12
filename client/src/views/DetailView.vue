<script>
import { mapActions, mapWritableState } from 'pinia';
import { useTodoStore } from '../stores/todo';
import TodoItemCard from '../components/TodoItemCard.vue';
import ellipse445 from '../assets/elipse-445.png';
import ellipse446 from '../assets/elipse-446.png';
import ellipse447 from '../assets/elipse-447.png';
import ellipse448 from '../assets/elipse-448.png';
import ellipse449 from '../assets/elipse-449.png';

export default {
    components: {
        TodoItemCard
    },
    data() {
        return {
            title: '',
            clicked: false,
            name: '',
            priority: '1',
            priorityName: 'Very High',
            imageSource: ellipse445,
            checkedTF: 'T',
            checkedSN: true,
            checkedSO: false,
            checkedSAZ: false,
            checkedSZA: false,
            checkedSBS: false
        }
    },
    methods: {
        ...mapActions(useTodoStore, ['fetchActivityById', 'updateActivity', 'createTodoItem', 'fetchTodoItems']),
        updateActivityComponent() {
            this.updateActivity(this.$route.params.id, {
                title: this.title
            });
            this.clicked = false;
        },
        createTodoItemComponent() {
            this.createTodoItem(this.$route.params.id, {
                name: this.priority+this.name+this.checkedTF
            })
        },
        toDashboardPage() {
            this.$router.push('/');
        },
        changeToInput() {
            this.clicked = true;
            this.title = this.activity.data.title;
        },
        updateparent(variable) {
            this.checkedSN = variable
            this.checkedSAZ = this.checkedSO = this.checkedSZA = this.checkedSBS = false
        },
        getSelected(item) {
            this.priority = item;

            switch(item) {
                case '1':
                    this.priorityName = 'Very High'
                    this.imageSource = ellipse445
                    break;
                case '2':
                    this.priorityName = 'High'
                    this.imageSource = ellipse446
                    break;
                case '3':
                    this.priorityName = 'Medium'
                    this.imageSource = ellipse447
                    break;
                case '4':
                    this.priorityName = 'Low'
                    this.imageSource = ellipse448
                    break;
                case '5':
                    this.priorityName = 'Very Low'
                    this.imageSource = ellipse449
                    break;
                default:
                    break;
                }
        }
    },
    computed: {
        ...mapWritableState(useTodoStore, ['activity', 'todoItems']),
        sortedAZ: function() {
            this.checkedSAZ = true
            this.checkedSN = this.checkedSO = this.checkedSZA = this.checkedSBS = false
            function compare(a, b) {
                if (a.title.split('').slice(1).join('') < b.title.split('').slice(1).join(''))
                    return -1;
                if (a.title.split('').slice(1).join('') > b.title.split('').slice(1).join(''))
                    return 1;
                return 0;
            }

            return this.todoItems.sort(compare);
        },
        sortedZA: function() {
            this.checkedSZA = true
            this.checkedSN = this.checkedSO = this.checkedSAZ = this.checkedSBS = false
            function compare(a, b) {
                if (a.title.split('').slice(1).join('') < b.title.split('').slice(1).join(''))
                    return 1;
                if (a.title.split('').slice(1).join('') > b.title.split('').slice(1).join(''))
                    return -1;
                return 0;
            }

            return this.todoItems.sort(compare);
        },
        sortedOld: function() {
            this.checkedSO = true
            this.checkedSN = this.checkedSAZ = this.checkedSZA = this.checkedSBS = false
            function compare(a, b) {
                return a.id - b.id;
            }

            return this.todoItems.sort(compare);
        },
        sortedNew: function() {
            this.checkedSN = true
            this.checkedSAZ = this.checkedSO = this.checkedSZA = this.checkedSBS = false
            function compare(a, b) {
                return b.id - a.id;
            }

            return this.todoItems.sort(compare);
        },
        sortedNotFinished: function() {
            this.checkedSBS = true
            this.checkedSN = this.checkedSO = this.checkedSZA = this.checkedSAZ = false
            function compare(a, b) {
                if (a.title.split('').slice(-1) < b.title.split('').slice(-1))
                    return 1;
                if (a.title.split('').slice(-1) > b.title.split('').slice(-1))
                    return -1;
                return 0;
            }

            return this.todoItems.sort(compare)
        }
    },
    created() {
        this.fetchActivityById(this.$route.params.id),
        this.fetchTodoItems(this.$route.params.id)
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
                    <h1 data-cy="todo-title" id="todo-title">{{ activity.data.title }}</h1>
                </div>
                <div v-else>
                    <input v-model="title" @focusout="updateActivityComponent"
                        class="form-control py-2 border-0 border-dark border-bottom rounded-0" type="text"
                        id="update-activity-input">
                </div>
            </div>
            <a @click.prevent="changeToInput" href="#">
                <img src="../assets/todo-title-edit-button.png" id="todo-title-edit-button" class="mt-3 ms-4">
            </a>
        </div>
        <div v-if="todoItems">
            <div class="dropdown">
                <button class="btn border-0 rounded-circle p-0 d-flex align-items-center"
                    type="button" id="dropdownSortButton" data-bs-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <img src="../assets/todo-sort-button.png" id="todo-sort-button">
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownSortButton" id="dropdown-menu-sort">
                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="sortedNew">
                        <img src="../assets/sort-latest.png" id="dd-item" class="me-3" />Terbaru
                        <img v-if="checkedSN" src="../assets/checked-sort.png" id="dd-item" class="mt-1 ms-5"/>
                    </li>
                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="sortedOld">
                        <img src="../assets/sort-oldest.png" id="dd-item" class="me-3" />Terlama
                        <img v-if="checkedSO" src="../assets/checked-sort.png" id="dd-item" class="mt-1 ms-5"/>
                    </li>
                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="sortedAZ">
                        <img src="../assets/sort-az.png" id="dd-item" class="me-3" />A-Z
                        <img v-if="checkedSAZ" src="../assets/checked-sort.png" id="dd-item" class="mt-1 ms-5"/>
                    </li>
                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="sortedZA">
                        <img src="../assets/sort-za.png" id="dd-item" class="me-3" />Z-A
                        <img v-if="checkedSZA" src="../assets/checked-sort.png" id="dd-item" class="mt-1 ms-5"/>
                    </li>
                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="sortedNotFinished">
                        <img src="../assets/sort-unfinished.png" id="dd-item" class="me-3" />Belum Selesai
                        <img v-if="checkedSBS" src="../assets/checked-sort.png" id="dd-item" class="mt-1 ms-3"/>
                    </li>
                </ul>
            </div>
        </div>
        <button type="button" data-cy="todo-add-button" id="todo-add-button" data-bs-toggle="modal"
            data-bs-target="#addModal">
            <img src="../assets/tabler-plus.png" id="tabler-plus">
            <h6 data-cy="Tambah" id="Tambah">Tambah</h6>
        </button>
    </div>
    <div v-if="!todoItems">
        <img src="../assets/todo-empty-state.png" id="todo-empty-state">
    </div>
    <div v-else id="cards-container">
        <div class="row gx-2 gy-3" id="cards" data-cy="todo-item">
            <TodoItemCard v-for="todoItem in todoItems" :key="todoItem.id" :todoItem="todoItem" :activityId="this.$route.params.id" @eventname="updateparent"/>
        </div>
    </div>
    
    <!-- Modal -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content p-2">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Tambah List Item</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="createTodoItemComponent">
                    <div class="modal-body">  
                        <div class="mb-3">
                            <label class="col-form-label" id="modal-add-name-title">NAMA LIST ITEM</label>
                            <input v-model="name" type="text" class="form-control p-2" placeholder="Tambahkan nama Activity">
                        </div>
                        <div class="mb-3">
                            <label class="col-form-label" id="modal-add-priority-title">PRIORITY</label>
                            <div class="dropdown">
                                <button class="btn btn-default dropdown-toggle border d-flex align-items-center pb-2"
                                    type="button" id="dropdownPriorityButton" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <img :src="imageSource" id="dd-item" class="me-3" />
                                    <div class="me-4">{{ priorityName }}</div>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownPriorityButton">
                                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="getSelected('1')">
                                        <img src="../assets/elipse-445.png" id="dd-item" class="me-3" />Very High
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="getSelected('2')">
                                        <img src="../assets/elipse-446.png" id="dd-item" class="me-3" />High
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="getSelected('3')">
                                        <img src="../assets/elipse-447.png" id="dd-item" class="me-3" />Medium
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="getSelected('4')">
                                        <img src="../assets/elipse-448.png" id="dd-item" class="me-3" />Low
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="getSelected('5')">
                                        <img src="../assets/elipse-449.png" id="dd-item" class="me-3" />Very Low
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" id="modal-add-save-button" data-bs-dismiss="modal">
                            <h6 data-cy="Simpan" id="Simpan">Simpan</h6>
                        </button>
                    </div>
                </form>
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

#dropdownSortButton {
    position: absolute;
    width: 54px;
    height: 54px;
    left: 910px;
    top: 150px;
}

#todo-sort-button {
    width: 54px;
    height: 54px;
}

#dropdown-menu-sort {
    width: 15%
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

#modal-add-name-title {
    font-weight: 600;
    font-size: 12px;
    color: #111111;
}

#modal-add-priority-title {
    font-weight: 600;
    font-size: 12px;
    color: #111111;
}

#dd-item {
    width: 14px;
    height: 14px;
}

#dropdownPriorityButton {
    width: 22%;
}
.dropdown-menu {
    width: 22%
}

#modal-add-save-button {
    width: 150px;
    height: 54px;
    background: #16ABF8;
    border-radius: 45px;
}

#Simpan {
    font-weight: 600;
    font-size: 20px;
    color: #FFFFFF;
    margin-top: 5px;
    align-self: center;
}

#cards-container {
    position: absolute;
    top: 250px;
    left: 140px;
    right: 120px;
}
</style>