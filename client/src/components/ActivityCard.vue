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
                <a @click.prevent="deleteActivity(activity.id, activity.title)" href="#" data-cy="activity-item-delete-button">
                    <img src="../assets/tabler-trash.png" id="tabler-trash" class="col-2 ms-2 mb-0">
                </a>
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
</style>