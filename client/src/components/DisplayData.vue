<template>
  <pre>{{ jsonAsString }}</pre>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, Ref, toRefs} from 'vue';

export default defineComponent({
  props: {
    data: {
      type: null,
      required: true,
    }
  },
  setup(props) {
    const {data} = toRefs(props);
    const jsonAsString: Ref<string> = computed(() => {
      if (data.value) {
        if (typeof data.value === 'string') {
          return data.value;
        } else {
          return JSON.stringify(data.value, undefined, 2);
        }
      }
    });

    return {
      jsonAsString,
    };
  },
})
</script>

<style scoped>
</style>
