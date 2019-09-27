<template>
    <v-card
            class="mx-auto"
            max-width="300"
            tile
    >
        <v-list flat>
            <v-subheader>REPORTS</v-subheader>
            <v-list-item-group v-model="item" color="primary">
                <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.name"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.date"></v-list-item-subtitle>
                        <v-list-item-subtitle v-text="item.product"></v-list-item-subtitle>
                        <v-list-item-subtitle v-text="item.commandLine" ></v-list-item-subtitle>
                        <v-list-item-subtitle v-text="item.image"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        data () {
            return {
                items:[

                ]
            }
        },
        watch: {
            '$store.state.treeItems': function () {
                this.items =this.$store.state.treeItems
            }
        },
    }
</script>
