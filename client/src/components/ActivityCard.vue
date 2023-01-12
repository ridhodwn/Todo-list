<script>
import { mapActions } from 'pinia';
import { useTodoStore } from '../stores/todo';

export default {
    props: {
        activity: Object
    },
    methods: {
        ...mapActions(useTodoStore, ['deleteActivity']),
        toDetailPage(id) {
            this.$router.push(`/detail/${id}`);
        }
    }
}
</script>

<template>
    <div>
        <div class="card p-4 border-0" id="activity-item">
            <a @click.prevent="toDetailPage(activity.id)" href="#" id="activity-card-title" data-cy="activity-item">
                <h5 class="fw-bold" data-cy="activity-item-title">{{ activity.title }}</h5>
            </a>
            <div class="d-flex mb-0">
                <p class="col-10 mb-0" data-cy="activity-item-date" id="activity-date">{{ new Date(activity.created_at).toLocaleDateString('id-id', {
                        day: "numeric",
                        year: "numeric", month: "long"
                    })
                }}</p>
                <a data-bs-toggle="modal" :data-bs-target="`#deleteModal${activity.id}`" href="#">
                    <img src="../assets/tabler-trash.png" id="tabler-trash" class="col-2 ms-2 mb-0">
                </a>
            </div>
        </div>
    </div>

    <!-- Modal Delete -->
    <div class="modal fade" :id="`deleteModal${activity.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content py-2 px-4">
                <div class="modal-body ">
                    <div class="mb-4 mt-3 d-flex justify-content-center">
                        <img src="../assets/modal-delete-icon.png" id="modal-delete-icon" class="">
                    </div>
                    <div class="mb-4 d-flex justify-content-center">
                        <p id="modal-delete-question" class="text-center">Apakah anda yakin menghapus activity
                        <b> "{{ activity.title }}"? </b></p>
                    </div>
                    <div class="mb-3 d-flex justify-content-center">
                        <button type="button" class="btn btn-primary border-0 me-3" id="modal-delete-cancel-button" data-bs-dismiss="modal" data-cy=modal-delete-cancel-button>
                            <h6 data-cy="Batal" id="Batal">Batal</h6>
                        </button>
                        <button type="button" class="btn btn-danger border-0" id="modal-delete-confirm-button" data-bs-dismiss="modal" @click.prevent="deleteActivity(activity.id, activity.title)" data-bs-target="#informationModal" data-bs-toggle="modal">
                            <h6 data-cy="Hapus" id="Hapus">Hapus</h6>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Information -->
    <div class="modal fade" id="informationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-cy=modal-information>
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body mx-3 py-1">
                    <div class="d-flex align-items-center">
                        <img src="../assets/modal-information-icon.png" id="modal-information-icon" class="me-3">
                        <p id="modal-information-title" class="mt-3">Activity berhasil dihapus</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#activity-item {
    background: #FFFFFF;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    width: 235px;
    height: 234px;
}

#activity-card-title {
    height: 240px;
    color: #000000;
    text-decoration: none;
}

#activity-date {
    color: #888888;
    font-size: 18px;
}

#tabler-trash {
    width: 24px;
    height: 24px;
}

#modal-information-icon {
    width: 24px;
    height: 24px;
}

#modal-information-title {
    font-size: 18px;
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