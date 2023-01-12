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
    emits: ['eventname'],
    data() {
        return {
            imageSource: ellipse445,
            imageSourceM: ellipse445,
            name: '',
            priority: this.todoItem.title.split('')[0],
            priorityNameM: 'Very High',
            checked: (this.todoItem.title.split('')[this.todoItem.title.length - 1] === 'T') ? false : true,
            checkedTF: this.todoItem.title.split('')[this.todoItem.title.length - 1],
            variable: true
        }
    },
    methods: {
        ...mapActions(useTodoStore, ['deleteTodoItem', 'updateTodoItem']),
        updateTodoItemComponent() {
            this.updateTodoItem(this.todoItem.id, {
                name: this.priority+this.name+this.checkedTF
            }, this.$route.params.id)
        },
        checkedTodoItemComponent() {
            console.log(this.checked, 'in Click Method')
            this.$emit('eventname', this.variable);
            if (this.checked) {
                this.checkedTF = 'T'
            } else {
                this.checkedTF = 'F'
            }

            this.checkedCase;
            // console.log(this.checkedCase)

            this.priority = this.todoItem.title.split('')[0];
            this.name = this.todoItem.title.split('').slice(1, -1).join('');
            this.updateTodoItem(this.todoItem.id, {
                name: this.priority+this.name+this.checkedTF
            }, this.$route.params.id)
        },
        getSelected(item) {
            this.priority = item;
            this.name = this.todoItem.title.split('').slice(1, -1).join('');

            switch(item) {
                case '1':
                    this.priorityNameM = 'Very High'
                    this.imageSourceM = ellipse445
                    break;
                case '2':
                    this.priorityNameM = 'High'
                    this.imageSourceM = ellipse446
                    break;
                case '3':
                    this.priorityNameM = 'Medium'
                    this.imageSourceM = ellipse447
                    break;
                case '4':
                    this.priorityNameM = 'Low'
                    this.imageSourceM = ellipse448
                    break;
                case '5':
                    this.priorityNameM = 'Very Low'
                    this.imageSourceM = ellipse449
                    break;
                default:
                    break;
                }
        }
    },
    computed: {
        ellipsesCase() {
            switch (this.todoItem.title.split('')[0]) {
                case '1':
                    this.imageSource = ellipse445
                    break;
                case '2':
                    this.imageSource = ellipse446
                    break;
                case '3':
                    this.imageSource = ellipse447
                    break;
                case '4':
                    this.imageSource = ellipse448
                    break;
                case '5':
                    this.imageSource = ellipse449
                    break;
                default:
                    break;
            }

            return this.imageSource
        },
        checkedCase() {
            console.log(this.checked, '<< in Checked Case')
            console.log(this.todoItem.title.split('')[this.todoItem.title.length - 1], '<< in Checked Case Split')
            console.log(this.checkedTF, '<< in Checked Case TF')
            if (this.todoItem.title.split('')[this.todoItem.title.length - 1] === 'T' || this.checkedTF === 'T') {
                console.log('T', '<< First If')
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<template>
    <div>
        <div class="card p-4 border-0" id="todo-item">
            <div class="d-flex justify-content-between">
                <div class="form-check form-check-inline d-flex align-items-center">
                    <input class="form-check-input me-4" type="checkbox" id="todo-item-checkbox" v-model="checked" @click="checkedTodoItemComponent">
                    <img :src="ellipsesCase" id="ellipses" class="me-4 align-self-center mb-0 mt-1" />
                    <del v-if="!checkedCase" id="checked-title"><h5 class="align-self-center mb-0 me-4" data-cy="todo-item-title" >
                        {{ todoItem.title.split('').slice(1, -1).join('') }}</h5>
                    </del>
                    <h5 v-else class="align-self-center mb-0 me-4" data-cy="todo-item-title">{{
                            todoItem.title.split('').slice(1, -1).join('')
                    }}</h5>
                    <a @click.prevent="getSelected(this.todoItem.title.split('')[0])" data-bs-toggle="modal" :data-bs-target="`#editModal${todoItem.id}`" href="#">
                        <img src="../assets/todo-item-edit-button.png" id="todo-item-edit-button" class="">
                    </a>
                </div>
                <a data-bs-toggle="modal" :data-bs-target="`#deleteModal${todoItem.id}`" href="#"
                    data-cy="todo-item-delete-button">
                    <img src="../assets/tabler-trash.png" id="tabler-trash" class="col-2 ms-2 mb-0">
                </a>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" :id="`editModal${todoItem.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-cy="modal-edit">
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
                            <input v-model="name" type="text" class="form-control p-2">
                        </div>
                        <div class="mb-3">
                            <label class="col-form-label" id="modal-edit-priority-title">PRIORITY</label>
                            <div class="dropdown">
                                <button class="btn btn-default dropdown-toggle border d-flex align-items-center pb-2"
                                    type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <img :src="imageSourceM" id="ellipses" class="me-3" />
                                    <div class="me-4">{{ priorityNameM }}</div>
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

    <!-- Modal Delete -->
    <div class="modal fade" :id="`deleteModal${todoItem.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-cy="modal-delete">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-2">
                <div class="modal-body ">
                    <div class="mb-4 mt-3 d-flex justify-content-center">
                        <img src="../assets/modal-delete-icon.png" id="modal-delete-icon" class="">
                    </div>
                    <div class="mb-4 d-flex justify-content-center">
                        <p id="modal-delete-question">Apakah anda yakin menghapus List Item
                        <b> "{{ todoItem.title.split('').slice(1, -1).join('') }}"? </b></p>
                    </div>
                    <div class="mb-3 d-flex justify-content-center">
                        <button type="button" class="btn btn-primary border-0 me-3" id="modal-delete-cancel-button" data-bs-dismiss="modal">
                            <h6 data-cy="Batal" id="Batal">Batal</h6>
                        </button>
                        <button type="button" class="btn btn-danger border-0" id="modal-delete-confirm-button" data-bs-dismiss="modal" @click.prevent="deleteTodoItem(todoItem.id, todoItem.title, +activityId)" data-bs-target="#informationModal" data-bs-toggle="modal">
                            <h6 data-cy="Hapus" id="Hapus">Hapus</h6>
                        </button>
                    </div>
                </div>
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

#checked-title {
    color: #888888
}

#modal-delete-cancel-button {
    width: 150px;
    height: 54px;
    background: #F4F4F4;
    border-radius: 45px;
}

#Batal {
    font-weight: 600;
    font-size: 20px;
    color: #4A4A4A;
    margin-top: 5px;
    align-self: center;
}

#Hapus {
    font-weight: 600;
    font-size: 20px;
    color: #FFFFFF;
    margin-top: 5px;
    align-self: center;
}

#modal-delete-confirm-button {
    width: 150px;
    height: 54px;
    background: #ED4C5C;
    border-radius: 45px;    
}

#modal-delete-icon {
    width: 84px;
    height: 84px;
}

#modal-delete-question {
    font-size: 18px;
}
</style>