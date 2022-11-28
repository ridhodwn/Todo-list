<script>
import { mapActions } from 'pinia';
import { useTodoStore } from '../stores/todo';
import ellipse445 from '../assets/elipse-445.png';
import ellipse446 from '../assets/elipse-446.png';
import ellipse447 from '../assets/elipse-447.png';
import ellipse448 from '../assets/elipse-448.png';
import ellipse449 from '../assets/elipse-449.png';

export default {
    props: {
        todoItem: Object,
        activityId: String
    },
    data() {
        return {
            imageSource: ellipse445,
            name1: this.todoItem.title.split('').slice(1).join(''),
            priority: this.todoItem.title.split('')[0],
            priorityName: 'Very High'
        }
    },
    methods: {
        ...mapActions(useTodoStore, ['deleteTodoItem', 'updateTodoItem']),
        updateTodoItemComponent() {
            this.updateTodoItem(this.$route.params.id, {
                name: this.priority+this.name
            })
        },
        showEditModal() {
            console.log('show Edit Modal')
            console.log(this.name1)
            this.name1 = this.todoItem.title.split('').slice(1).join('')
            console.log(this.name1)
        }
    },
    computed: {
        ellipsesCase() {
            let obj = {};
            switch (this.todoItem.title.split('')[0]) {
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

            obj.imageSource = this.imageSource;
            obj.priorityName = this.priorityName;

            return obj
        }
    }
}
</script>

<template>
    <div>
        <div class="card p-4 border-0" id="todo-item">
            <div class="d-flex justify-content-between">
                <div class="form-check form-check-inline d-flex align-items-center">
                    <input class="form-check-input me-4" type="checkbox" id="todo-item-checkbox" value="option1">
                    <img :src="ellipsesCase.imageSource" id="ellipses" class="me-4 align-self-center mb-0 mt-1" />
                    <h5 class="align-self-center mb-0 me-4" data-cy="todo-item-title">{{
                            todoItem.title.split('').slice(1).join('')
                    }}</h5>
                    <a @click.prevent="showEditModal" data-bs-toggle="modal" :data-bs-target="`#editModal${todoItem.id}`" href="#">
                        <img src="../assets/todo-item-edit-button.png" id="todo-item-edit-button" class="">
                    </a>
                </div>
                <a @click.prevent="deleteTodoItem(todoItem.id, todoItem.title, +activityId)" href="#"
                    data-cy="todo-item-delete-button">
                    <img src="../assets/tabler-trash.png" id="tabler-trash" class="col-2 ms-2 mb-0">
                </a>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" :id="`editModal${todoItem.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content p-2">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Edit Item</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="updateTodoItemComponent">
                    <div class="modal-body">  
                        <div class="mb-3">
                            <label class="col-form-label" id="modal-edit-name-title">NAMA LIST ITEM</label>
                            <input v-model="name1" type="text" class="form-control p-2">
                        </div>
                        <div class="mb-3">
                            <label class="col-form-label" id="modal-edit-priority-title">PRIORITY</label>
                            <div class="dropdown">
                                <button class="btn btn-default dropdown-toggle border d-flex align-items-center pb-2"
                                    type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <img :src="ellipsesCase.imageSource" id="ellipses" class="me-3" />
                                    <div class="me-4">{{ ellipsesCase.priorityName }}</div>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="getSelected('1')">
                                        <img src="../assets/elipse-445.png" id="ellipses" class="me-3" />Very High
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="getSelected('2')">
                                        <img src="../assets/elipse-446.png" id="ellipses" class="me-3" />High
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="getSelected('3')">
                                        <img src="../assets/elipse-447.png" id="ellipses" class="me-3" />Medium
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="getSelected('4')">
                                        <img src="../assets/elipse-448.png" id="ellipses" class="me-3" />Low
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center pb-2" @click.prevent="getSelected('5')">
                                        <img src="../assets/elipse-449.png" id="ellipses" class="me-3" />Very Low
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" id="modal-edit-save-button" data-bs-dismiss="modal">
                            <h6 data-cy="Simpan" id="Simpan">Simpan</h6>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
#todo-item {
    background: #FFFFFF;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    width: 1000px;
    height: 80px;
}

#tabler-trash {
    width: 24px;
    height: 24px;
}

#ellipses {
    width: 14px;
    height: 14px;
}

#todo-item-checkbox {
    width: 20px;
    height: 20px;
}

#todo-item-edit-button {
    width: 20px;
    height: 20px;
}

#modal-edit-name-title {
    font-weight: 600;
    font-size: 12px;
    color: #111111;
}

#modal-edit-priority-title {
    font-weight: 600;
    font-size: 12px;
    color: #111111;
}

#dropdownMenuButton {
    width: 22%;
}
.dropdown-menu {
    width: 22%
}

#modal-edit-save-button {
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
</style>