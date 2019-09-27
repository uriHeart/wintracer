<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8">
                    <malicious-list>
                    </malicious-list>
                </div>
                <div class="col-md-4">
                    <OderList>
                    </OderList>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import MaliciousList from './LogTrace/MaliciousList.vue'
    // import LogTree from './LogTrace/LogTree.vue'
    import OderList from './LogTrace/OderList.vue'

    export default {
        components: {
            MaliciousList,
            OderList
        }
    }

</script>
<style>

</style>
