<template>
  <body :class="{ '-dark': data.darkMode }">
    <RouterView />
  </body>
</template>

<script lang="ts">
import { DataViewModel } from "@/store/modules/data/models";
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component({
  components: {},
})
export default class App extends Vue {
  // viewModel を引き当てる
  @Getter("data/viewModel") data!: DataViewModel;
}
</script>
