<template>
    <div class="bar">
        <div class="progress" v-bind:style="{'background': colorProgress, 'width': percentProgress + '%' }">{{ percentProgress }}%</div>
    </div>
</template>
<script>

export default {
    props:["percentProgress", "colorProgress"]
}
</script>

<style lang="sass">
@import './style/progress.scss'
</style>