<script>
import { mapActions, mapWritableState } from 'pinia';
import { useTodoStore } from '../stores/todo';
import ActivityCard from '../components/ActivityCard.vue';

export default {
    components: {
        ActivityCard
    },
    methods: {
        ...mapActions(useTodoStore, ['createActivity', 'fetchActivities'])
    },
    computed: {
        ...mapWritableState(useTodoStore, ['activities'])
    },
    created() {
        this.fetchActivities();
    }
}
</script>

<template>
    <div>
        <h1 data-cy="activity-title" id="activity-title">Activity</h1>
        <button @click.prevent="createActivity" data-cy="activity-add-button" id="activity-add-button">
            <img src="../assets/tabler-plus.png" id="tabler-plus">
            <h6 data-cy="Tambah" id="Tambah">Tambah</h6>
        </button>
    </div>
    <div v-if="!activities">
        <img src="../assets/activity-empty-state.png" id="activity-empty-state">
    </div>
    <div v-else id="cards-container">
        <div class="row row-cols-md-4 d-flex gx-2 gy-4" id="cards" data-cy="activity-item">
            <ActivityCard v-for="activity in activities" :key="activities.id" :activity="activity"/>
        </div>
    </div>
</template>

<style scoped>
#activity-title {
    position: absolute;
    width: 145px;
    height: 54px;
    left: 143px;
    top: 140px;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 54px;
    color: #111111;
}

#activity-add-button {
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

#activity-empty-state {
    position: absolute;
    width: 500px;
    height: 320px;
    left: 27vw;
    top: 38vh;
}

#cards-container {
    position: absolute;
    top: 250px;
    left: 140px;
    right: 120px;
}
</style>